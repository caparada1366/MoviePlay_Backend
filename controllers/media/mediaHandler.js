// Acá irían los handlers para las movies y series (media)
const { getAllMedia, getMediaById, postNewMedia } = require('./mediaController');

const getMedia = async (req, res) => {
    try {
        const response = await getAllMedia();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: 'para la cola' })
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
    let {} = req.body  // los datos que necesitemos para postear
    try {
        const response = await postNewMedia() // la info que necistamos para postear.
        res.status(200).json(response)

    } catch (error) {
        res.status(400).json({ error: 'para la cola' })
    }
}

module.exports = {
    getMedia,
    mediaByID,
    postMedia,
}