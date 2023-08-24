const { Series, Genres, Episodios, Review, Usuario} = require('../config/database');

const serieByID = async (req, res) => {
    let { id } = req.params;
    try {
        console.log(id);
      const serieId = await Series.findByPk(id, {
        include: [
            { model: Episodios },
            { model: Genres },
            { model: Review,
            include: Usuario}
        ]
    });
    var sumaCal = 0;
    var calProm = 0;
    if(serieId.Reviews.length >0 ){
      serieId.Reviews.forEach(rev=>{
          sumaCal += rev.calificacion
      })
      calProm = sumaCal/serieId.Reviews.length;     
    }
      const obj = {
        serieId: serieId.serieId,
        titulo: serieId.titulo,
        descripcion: serieId.descripcion,
        yearEstreno: serieId.yearEstreno,
        actores: serieId.actores,
        image: serieId.image,
        active: serieId.active,
        price: serieId.price,
        'Episodios': serieId.Episodios,
        'Genres': serieId.Genres,
        'Reviews': serieId.Reviews,
        promCal: calProm
      };
      
      res.status(200).json(obj);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


module.exports = serieByID;