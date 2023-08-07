const { Router } = require("express");
// Acá habría que importar los handlers :)
const {
  getMedia,
  mediaByID,
  postMedia,
} = require("../../controllers/media/mediaHandler");
const getMoviesYSeries = require("../../controllers/getMoviesYSeries");
const getSeries = require("../../controllers/getSeries")
const getMovies = require("../../controllers/getMovies");
const serieByID = require("../../controllers/getSerieByID");
const { postSeries } = require("../../controllers/postSeries");

const mediaRouter = Router();

mediaRouter.get("/todo", getMoviesYSeries);
mediaRouter.get("/series", getSeries);
mediaRouter.get("/movies", getMovies);
mediaRouter.get("/", getMedia);
mediaRouter.get("/:id", mediaByID);
mediaRouter.get("/series/:id", serieByID);
mediaRouter.post("/", postMedia);
mediaRouter.post("/series", postSeries);

module.exports = mediaRouter;