const {Router} = require('express')
const postReview = require('../controllers/reviews/postReview');
const getReviewsXmultimedia = require('../controllers/reviews/getReviewsXmultimedia');



const reviewRouter = Router()

reviewRouter.post('/', postReview);
reviewRouter.get('/', getReviewsXmultimedia);    


module.exports = reviewRouter;