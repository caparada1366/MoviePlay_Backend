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
const authUser = require("../../midlleware/validateToken");

const mediaRouter = Router();

mediaRouter.get("/todo", authUser, getMoviesYSeries);
mediaRouter.get("/series", authUser, getSeries);
mediaRouter.get("/movies", authUser, getMovies);
mediaRouter.get("/", authUser, getMedia);
mediaRouter.get("/:id", authUser, mediaByID);
mediaRouter.get("/series/:id", authUser, serieByID);
mediaRouter.post("/", authUser, postMedia);
mediaRouter.post("/series", authUser, postSeries);

module.exports = mediaRouter;