const { Series, Genres, Episodios} = require('../config/database');

const serieByID = async (req, res) => {
    let { id } = req.params;
    try {
        console.log(id);
      const serieId = await Series.findByPk(id, {
        include: [
            { model: Episodios },
            { model: Genres }
        ]
    });
      res.status(200).json(serieId);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


module.exports = serieByID;