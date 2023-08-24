const { Multimedia, Genres, Series, Episodios, Review, Usuario } = require("../../config/database");
const { apiMovie, genres, apiMoviesySeries, series, episodio } = require("../../apiData/apiMovie");
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
//cargar todas las series con su primer episodio

const loadSeries =async()=>{
  try {
    series.forEach(async serie =>{
      let nuevaSerie = await Series.create({
        titulo: serie.titulo,
        descripcion: serie.descripcion,
        yearEstreno : serie.yearEstreno,
        actores: serie.actores,
        image: serie.image,
        price: serie.price
       
      })
      for (const gen of serie.genres) {
        const [genre] = await Genres.findAll({
          where: { name: gen },
        });

        await nuevaSerie.addGenres(genre);
      }
      let nuevoEpisodio = await Episodios.create({
        numEpisodio: serie.numEpisodio,
        numTemporada: serie.numTemporada,
        descripcionEpisodio: serie.descripcionEpisodio,
        tituloEpisodio: serie.tituloEpisodio,
        linkVideo: serie.linkVideo,
        duracion: serie.duracion
      })
      await nuevaSerie.addEpisodios(nuevoEpisodio)
    })
  } catch (error) {
    throw new Error(error.message)
  }
}

///Metodo para cargar episodios 
const loadEpisodios =async()=>{
  try {
    episodio.forEach(async (ep)=>{
      const laSerie = await Series.findOne({
        where: { titulo: ep.titulo }
      })
      
      if(laSerie){
      let nuevoEpisodio = await Episodios.create({
        numEpisodio: ep.numEpisodio,
        numTemporada: ep.numTemporada,
        descripcionEpisodio: ep.descripcionEpisodio,
        tituloEpisodio: ep.tituloEpisodio,
        linkVideo: ep.linkVideo,
        duracion: ep.duracion
      })
      await laSerie.addEpisodios(nuevoEpisodio);
    };
    })
  } catch (error) {
    throw new Error(error.message)
  }
}


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

const getAllMedia = async () => {
  const countGenre = await Genres.count();
  const countMedia = await Multimedia.count(); // con '.count()' obtenemos el número de registros

    if (countMedia === 0 && countGenre === 0) {
    // Si no hay nada, entonces activamos la función para cargar Multimedia
    await loadGenres();
    await loadMultimedia();
    await loadSeries();
    await loadEpisodios();
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
    include: [{
      model: Genres,
      attributes: ["name"],
      through: { attributes: [] },
    }, {
      model: Review,
      include: Usuario}],
  });
  var sumaCal = 0;
  var calProm = 0;
  if(media.Reviews.length >0 ){
    media.Reviews.forEach(rev=>{
        sumaCal += rev.calificacion
    })
    calProm = sumaCal/media.Reviews.length;     
  }

  const obj ={
    id: media.id,
    name: media.name,
    description: media.description,
    time: media.time,
    linkVideo: media.linkVideo,
    image: media.image,
    active: media.active,
    price: media.price,
    'Genres': media.Genres,
    'Reviews': media.Reviews,
    promCal: calProm
  }

  if (!media) {
    throw new Error(`The provided ID doesn't exist`);
  }

    return obj;
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
