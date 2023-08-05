const { Multimedia, Genres } = require("../../config/database");
const { apiMovie, genres, apiMoviesySeries } = require("../../apiData/apiMovie");
const { Op } = require("sequelize");

// Cargamos la db con los datos de la fake API:  (esto es para las pruebas)
const loadMultimedia = async () => {
  try {
    // Verificamos si ya existen registros en la tabla Multimedia
    const count = await Multimedia.count();
    if (count > 0) {
      console.log(
        "La tabla Multimedia ya está poblada. No es necesario cargar los datos nuevamente."
      );
      return;
    }

    apiMoviesySeries.forEach(async (ele) => {
      if(ele.type === 'movie') {
        let movieCreate = await Multimedia.create({
          // type: ele.type,
          name: ele.name,
          description: ele.description,
          time: 120,
          linkVideo: ele.linkVideo,
          image: ele.image,
          active: true,
          price: ele.price,
          genres: ele.genres,
        });
  
        for (const gen of ele.genres) {
          const [genre] = await Genres.findAll({
            where: { name: gen },
          });
  
          await movieCreate.addGenres(genre);
        }
        
      }
    });

    console.log('Datos de multimedia cargados correctamente.');
  } catch (error) {
    console.error('Error loading multimedia:', error);
    throw new Error('Error loading multimedia');
  }

};

// Esto es de prueba, podemos modificarlo para que quede mejor
const loadGenres = async () => {
  // Hacemos lo mismo con la api de genres:
  const genresMapped = genres.map((ele) => {
    return {
      name: ele.name,
    };
  });

  // Cargamos Genres:
  const generos = await Genres.bulkCreate(genresMapped);

  return generos;
};

const getAllMedia = async (name) => {
  const countGenre = await Genres.count();
  const countMedia = await Multimedia.count(); // con '.count()' obtenemos el número de registros

  if (countGenre === 0) {
    // Si no hay nada, entonces activamos la función para cargar Genres
    await loadGenres();
  }
  if (countMedia === 0) {
    // Si no hay nada, entonces activamos la función para cargar Multimedia
    await loadMultimedia();
  }

  const media = await Multimedia.findAll({
    include: {
      model: Genres,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  // if (name && media.length === 0) {
  //   throw new Error(`The movie with the name ${name} doesn't exist`);
  // }

  return media;
};

const getMediaById = async (id) => {
  const media = await Multimedia.findOne({
    where: { id: id },
    include: {
      model: Genres,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  if (!media) {
    throw new Error(`The provided ID doesn't exist`);
  }

    return media;
}



const postNewMedia = async(type, name, description, time, linkVideo, image, price, genres) => {

  // VALIDACIONES ( SAQUÉ TIME, PRICE HASTA QUE LO AGREGUEMOS A LA API :) )

  const nameMin = name.toLowerCase()

  if (type === "movie") {
    const existingMovie = await Multimedia.findOne({
      where: { name: {[Op.iLike]: nameMin} }
    });

    if( existingMovie ) {
      throw new Error( 'La película ya existe' )
    }

    let movieCreate = await Multimedia.create({
      type,
      name,
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

    return movieCreate;
  }
};

module.exports = {
  getAllMedia,
  getMediaById,
  postNewMedia,
};
