const { Multimedia, Genres } = require("../../config/database");
const { apiMovie, genres } = require("../../apiData/apiMovie");
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

    // Mapeamos la api de movies y traemos la info que queramos:
    // const moviesMapped = apiMovie.map((ele) => ({
    //   type: ele.type,
    //   name: ele.name,
    //   description: ele.description,
    //   time: 120,
    //   linkVideo: ele.linkVideo,
    //   image: ele.image,
    //   active: true,
    //   price: ele.price,
    //   genres: ele.genres
    // }));

    apiMovie.forEach(async (ele) => {
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
    });

    // Cargamos a Multimedia usando bulkCreate
    const createdMedia = await Multimedia.bulkCreate(moviesMapped);

    // Verificamos si todos los registros se crearon con éxito
    if (createdMedia.length !== moviesMapped.length) {
      throw new Error(
        "Error loading multimedia: Some records were not created."
      );
    }

    return createdMedia;
  } catch (error) {
    console.error("Error loading multimedia:", error);
    throw new Error("Error loading multimedia");
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
  const countMedia = await Multimedia.count(); // con '.count()' obtenemos el número de registros
  const countGenre = await Genres.count();

  if (countMedia === 0) {
    // Si no hay nada, entonces activamos la función para cargar Multimedia
    await loadMultimedia();
  }
  if (countGenre === 0) {
    // Si no hay nada, entonces activamos la función para cargar Genres
    await loadGenres();
  }

  const media = await Multimedia.findAll({
    include: {
      model: Genres,
      attributes: ["name"],
      through: { attributes: [] },
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

  if (
    !type ||
    typeof type !== "string" ||
    !name ||
    typeof name !== "string" ||
    !description ||
    typeof description !== "string" ||
    typeof time !== "number" ||
    !linkVideo ||
    typeof linkVideo !== "string" ||
    !isValidUrl(linkVideo) ||
    !image ||
    typeof image !== "string" ||
    !isValidImageUrl(image) ||
    typeof price !== "number" ||
    isNaN(price) ||
    !isFinite(price) ||
    genres.length === 0
  ) {
    throw new Error(
      "Invalid Data: Please provide valid values for all required fields."
    );
  }

  if (type === "movie") {
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
