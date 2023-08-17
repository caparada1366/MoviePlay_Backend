const {Multimedia, Series} = require('../config/database')
const axios = require('axios')
const apiKey = 'AIzaSyDW0nfjxqYa5ZlximEI6TcQDL5ZL0XA7eQ'

const topFiveMovie = async (req, res) => {
    try {
        const movies = await Multimedia.findAll();

        const videoIds = movies.map((m) => {
            const videoUrl = new URL(m.linkVideo)
            //  return videoUrl.split('v=')[1];
            return videoUrl.searchParams.get('v')
        });

        // const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        //     params: {
        //         key: apiKey,
        //         id: videoIds.join(','),
        //         part: 'statistics'
        //     }
        // });
        // const data = response.data.items

        // const viewCounts = response.data.items.map(item => item.statistics.viewCount);
        


        res.status(200).json('hola');
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}


const topFiveSeries = async(req, res) => {

}

module.exports = {topFiveMovie, topFiveSeries}