const { Multimedia, Genres } = require('../../config/database');
const { apiMovie, genres } = require('../../config/apiMovie');

  // Cargamos la db con los datos de la fake API:
const loadMultimedia = async() => {
  // Mapeamos la api de movies y traemos la info que queramos:
  // const moviesMapped = apiMovie.map( ele => {
  //   return {
  //     type: ele.type,
  //     name: ele.name,
  //     description: ele.description,
  //     linkVideo: ele.linkVideo,
  //     image: ele.image,
  //   }
  // } );

  // // Cargamos a Multimedia:
  // await Multimedia.bulkCreate(moviesMapped);

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


const loadGenres = async() => {
  const apiGenres = genres;
  
    // Hacemos lo mismo con la api de genres:
    const genresMapped = apiGenres.map( ele => {
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
    if( countGenre === 0 ) {
      await loadGenres();
    }

    const media = await Multimedia.findAll({
      include: [Genres],
    });

    // Devolvemos media con toda la info cargada + los géneros relacionados
    return media;


};



const getMediaById = async( id ) => {
    const media = await Multimedia.findOne({
        where: { id: id },
        include: [{ model: Genres, through: 'MultimediaGenres' }]
    });

    if( !media ) {
        throw new Error( `The provided ID doesn't exist` );
    }

    return media;
}

// Solo me faltaría añadir la parte de series, pero quería que vieran el código primero. (Ah, me faltan validaciones específicas nomás)

// const postNewMedia = async(type, name, description, time, linkVideo, image, price, genres) => {

//     if( !type || !name || !description || !time || !linkVideo || !image || !price || genres.length === 0 ) {
//         throw new Error( 'Missing Data: Please provide all required fields' );
//     };

//     // Después le voy a aplicar validaciones a cada parámetro

//     if( type === 'movie' ) {
//         let movieCreate = await Multimedia.create({
//             type,
//             name,
//             description,
//             time,
//             linkVideo,
//             image,
//             price,
//         });

//         await Promise.all(genres.map(async (gen) => {
//             const [associate] = await Genres.findOrCreate({ // findOrCreate por si necesitamos crear nuevos géneros, si no se lo saco.
//                 where: { name: gen },
//             });
//             await movieCreate.addGenres(associate); // Asociamos la movie creada a sus géneros.
//         }));

//         return movieCreate;
//     }
// }


/*
Esta opción también puede ser:

const postNewMedia = async (type, name, description, time, linkVideo, image, price, genres) => {
  if (!type || !name || !description || !time || !linkVideo || !image || !price || genres.length === 0) {
    throw new Error('Missing Data: Please provide all required fields.');
  }

  // Acá puedo agregar más validaciones para los tipos de datos, rangos, etc.

  try {
    // Uso una transacción para asegurarnos de que todas las operaciones se completen con éxito o se reviertan en caso de error.
    const media = await sequelize.transaction(async (t) => {
      // Creamos la película o serie
      const media = await Multimedia.create({
        type,
        name,
        description,
        time,
        linkVideo,
        image,
        price,
      }, { transaction: t });

      // Asociamos los géneros uno por uno. Uso un 'for of', distinto del 'Promise.all' con el 'map' de arriba.
      for (const gen of genres) {
        const [genre, created] = await Genres.findOrCreate({
          where: { name: gen },
          transaction: t,
        });
        if (created) {
          // Aca podemos agregar lógica adicional si queremos hacer algo específico en caso de que se cree un nuevo género.
          // Si no, lo borramos al carajo.
        }
        await media.addGenres(genre, { transaction: t });
      }

      return media;
    });

    return media;
  } catch (error) {
    throw new Error('Error creating media');
  }
};
 */


const isValidUrl = (url) => {
  // Expresión regular para validar URLs generales
  const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
  return urlPattern.test(url);
};

const isValidImageUrl = (url) => {
  // Expresión regular para validar URLs de imágenes
  const imagePattern = /\.(jpeg|jpg|gif|png|svg)$/i;
  return imagePattern.test(url);
};


const postNewMedia = async (type, name, description, time, linkVideo, image, price, genres) => {

  // Validaciones de los datos:
  if (!type || typeof type !== 'string' || !name || typeof name !== 'string' || 
      !description || typeof description !== 'string' || 
      // !Number.isInteger(time) || 
      !linkVideo || typeof linkVideo !== 'string' || !isValidUrl(linkVideo) || 
      !image || typeof image !== 'string' || !isValidImageUrl(image) || 
      // typeof price !== 'number' || isNaN(price) || !isFinite(price) || 
      genres.length === 0) {
    throw new Error('Invalid Data: Please provide valid values for all required fields.');
  }

  // Acá puedo agregar más validaciones para los tipos de datos, rangos, etc.

  try {
    // Uso una transacción para asegurarnos de que todas las operaciones se completen con éxito o se reviertan en caso de error.
    const createdMedia = await sequelize.transaction(async (t) => {
      // Creamos la película o serie
      const media = await Multimedia.create({
        type,
        name,
        description,
        // time,
        linkVideo,
        image,
        // price,
      }, { transaction: t });

      // Asociamos los géneros uno por uno. Uso un 'for of', distinto del 'Promise.all' con el 'map' de arriba.
      for (const gen of genres) {
        const [genre] = await Genres.findOrCreate({
          where: { name: gen },
          transaction: t,
        });

        await media.addGenres(genre, { transaction: t });
      }

      return media;
    });

    return createdMedia;
  } catch (error) {
    throw new Error('Error creating media');
  }
};



module.exports = {
    getAllMedia,
    getMediaById,
    postNewMedia,
}