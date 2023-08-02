const { Router } = require("express");
// Acá habría que importar los handlers :)

const mediaRouter = Router();

mediaRouter.get("/"); // Osea,  '/media';  Faltarían los handlers.
mediaRouter.get("/:id"); // Osea, '/media/id';  Faltarían los handlers.
mediaRouter.post("/"); // Faltaría el handler

module.exports = mediaRouter;
