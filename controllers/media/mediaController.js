const { Multimedia, Genres } = require('../../config/database');
const { apiMovie, genres } = require('../../apiData/apiMovie');

  // Cargamos la db con los datos de la fake API:  (esto es para las pruebas)
const loadMultimedia = async() => {
  try {
    // Mapeamos la api de movies y traemos la info que queramos:
    const moviesMapped = apiMovie.map((ele) => ({
      type: ele.type,
      name: ele.name,
      description: ele.description,
      linkVideo: ele.linkVideo,
      image: ele.image,
    }));

    // Cargamos a Multimedia usando bulkCreate
    const createdMedia = await Multimedia.bulkCreate(moviesMapped);

    // Verificamos si todos los registros se crearon con éxito
    if (createdMedia.length !== moviesMapped.length) {
      throw new Error('Error loading multimedia: Some records were not created.');
    }

    return createdMedia;
  } catch (error) {
    console.error('Error loading multimedia:', error);
    throw new Error('Error loading multimedia');
  }

}

// Esto es de prueba, podemos modificarlo para que quede mejor
const loadGenres = async() => {
  // const apiGenres = genres;
  
    // Hacemos lo mismo con la api de genres:
    const genresMapped = genres.map( ele => {
      return {
        name: ele.name,
      }
    } );

    // Cargamos Genres:
    const generos = await Genres.bulkCreate(genresMapped);

    return generos;
}


const getAllMedia = async() => {
    const countMedia = await Multimedia.count();  // con '.count()' obtenemos el número de registros 
    const countGenre = await Genres.count();

    if( countMedia === 0 ) { // Si no hay nada, entonces activamos la función para cargar Multimedia
      await loadMultimedia();
    }
    if( countGenre === 0 ) { // Si no hay nada, entonces activamos la función para cargar Genres
      await loadGenres();
    }

    const media = await Multimedia.findAll({
      include: {
        model: Genres,
        attributes: ['name'],
        through: { attributes: [], },  // así no nos trae la tabla de unión
      },
    });

    // Devolvemos media con toda la info cargada
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



const isValidUrl = (url) => {
  // Expresión regular para validar URLs generales
  const urlPattern = /^https?:\/\/\S+$/;
  return urlPattern.test(url);
};

const isValidImageUrl = (url) => {
  // Expresión regular para validar URLs de imágenes
  const imagePattern = /\.(jpeg|jpg|gif|png|svg)$/i;
  return imagePattern.test(url);
};



const postNewMedia = async(type, name, description, linkVideo, image, genres) => {

  // VALIDACIONES ( SAQUÉ TIME, PRICE HASTA QUE LO AGREGUEMOS A LA API :) )

  if (!type || typeof type !== 'string' || !name || typeof name !== 'string' || 
      !description || typeof description !== 'string' || 
      // !Number.isInteger(time) || 
      !linkVideo || typeof linkVideo !== 'string' || !isValidUrl(linkVideo) || 
      !image || typeof image !== 'string' || !isValidImageUrl(image) || 
      // typeof price !== 'number' || isNaN(price) || !isFinite(price) || 
      genres.length === 0) {
    throw new Error('Invalid Data: Please provide valid values for all required fields.');
  }


    if( type === 'movie' ) {
        let movieCreate = await Multimedia.create({
            type,
            name,
            description,
            linkVideo,
            image,
        });

    for (const gen of genres) {
      const [genre] = await Genres.findOrCreate({
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