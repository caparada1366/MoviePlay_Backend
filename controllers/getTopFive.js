const {Multimedia, Series} = require('../config/database')
const axios = require('axios')
const apiKey = 'AIzaSyDW0nfjxqYa5ZlximEI6TcQDL5ZL0XA7eQ'

const topFiveMovie = async (req, res) => {
    try {
        const movies = await Multimedia.findAll();

        const videoIds = movies.map((m) => {
            const videoUrl = new URL(m.linkVideo)
            
            return videoUrl.searchParams.get('v')
        });


        res.status(200).json(videoIds);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}


const topFiveSeries = async(req, res) => {

}

module.exports = {topFiveMovie, topFiveSeries}