// Acá irían los handlers para las movies y series (media)
const { getAllMedia, getMediaById, postNewMedia } = require('./mediaController');

const getMedia = async (req, res) => {
    try {
        const response = await getAllMedia();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const mediaByID = async (req, res) => {
    let { id } = req.params
    try {
        const response = await getMediaById(id)
        res.status(200).json(response);

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const postMedia = async (req, res) => {
    let {type, name, description, linkVideo, image, genres} = req.body  
    try {
        const response = await postNewMedia(type, name, description, linkVideo, image, genres); 
        res.status(200).json(response)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getMedia,
    mediaByID,
    postMedia,
}