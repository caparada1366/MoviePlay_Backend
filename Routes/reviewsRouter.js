const {Router} = require('express')
const postReview = require('../controllers/reviews/postReview');
const getReviewsXmultimedia = require('../controllers/reviews/getReviewsXmultimedia');



const reviewRouter = Router()

reviewRouter.post('/', postReview); //calificacion, comentario, idUser, idMovie o idSerie
reviewRouter.get('/', getReviewsXmultimedia); // idMovie o idSerie por body   


module.exports = reviewRouter;