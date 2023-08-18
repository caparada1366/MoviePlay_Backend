const {Multimedia, Series, Episodios} = require('../config/database')
const axios = require('axios')
const apiKey = 'AIzaSyDW0nfjxqYa5ZlximEI6TcQDL5ZL0XA7eQ'

const topFiveMovie = async (req, res) => {
    try {
        const movies = await Multimedia.findAll();

        const videoIds = movies.map((m) => {
            const videoUrl = new URL(m.linkVideo)

            return videoUrl.searchParams.get('v')
        });

        const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
            params: {
                key: apiKey,
                id: videoIds.join(','),
                part: 'statistics'
            }
        });
        const data = response.data.items.map(i => i.statistics.viewCount);
        const top5 = data.sort((a, b) => b - a).slice(0, 5);

        res.status(200).json(top5);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}


const topFiveSeries = async(req, res) => {
    try {
        const series = await Series.findAll({
            include: [{ model: Episodios, where: {numEpisodio: 1} }]
        });

        const videoIds = series.map(s => {
            const episode = s.Episodios[0];
            if(episode) {
                const videoUrl = new URL(episode.linkVideo);
    
                return videoUrl.searchParams.get('v')
            }
            return null;
        });

        const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
            params: {
                key: apiKey,
                id: videoIds.join(','),
                part: 'statistics'
            }
        });
        const data = response.data.items.map(i => i.statistics.viewCount);
        const top5 = data.sort((a, b) => b - a).slice(0, 5);

        res.status(200).json(top5);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = {topFiveMovie, topFiveSeries}