const { Multimedia, Genres } = require('../../config/database');
const { Op } = require('sequelize');


const getAllMedia = async(name) => {

    const media = await Multimedia.findAll({
      include: {
        model: Genres,
      },
      where: name
        ? {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          }
        : {},
    });
  
    if (name && media.length === 0) {
      throw new Error(`The movie with the name ${name} doesn't exist`);
    }
  
    return media;


};



const getMediaById = async( id ) => {
    const media = await Multimedia.findOne({
        where: { id: id },
        include: { 
          model: Genres, 
          attributes: ['name'],
          through: { attributes: [], },
        },
    });

    if( !media ) {
        throw new Error( `The provided ID doesn't exist` );
    }

    return media;
}



const postNewMedia = async(type, name, description, time, linkVideo, image, price, genres) => {

  // Conversión del nombre de la peli a minúsculas:
    const minName = name.toLowerCase();
  
  // Verificar si ya existe en la db para evitar repeticiones:
    
    if( type === 'movie' ) {
        const existingMovie = await Multimedia.findOne({
          where: { name: { [Op.iLike]: minName } },
        });

        if( existingMovie ) {
          throw new Error( 'The movie already exists' );
        }
  
  // Si no existe, la creamos: 
        let movieCreate = await Multimedia.create({
            type,
            name: minName, // Creamos la peli con el name en minúsculas
            description,
            time,
            linkVideo,
            image,
            price,
        });

    for (const gen of genres) {
      const [genre] = await Genres.findAll({
        where: { name: gen },
      });

      await movieCreate.addGenres(genre);
    }

      return movieCreate
    }
}


module.exports = {
    getAllMedia,
    getMediaById,
    postNewMedia,
}