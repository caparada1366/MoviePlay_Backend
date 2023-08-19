const {Multimedia, Series, Episodios} = require('../config/database')
const axios = require('axios')
const apiKey = 'AIzaSyDW0nfjxqYa5ZlximEI6TcQDL5ZL0XA7eQ'

const topFiveMovie = async (req, res) => {
    try {
    const movies = await Multimedia.findAll();

        const videoData = await Promise.all(movies.map(async (m) => {
            const videoUrl = new URL(m.linkVideo);
            const videoId = videoUrl.searchParams.get('v');

            const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                params: {
                    key: apiKey,
                    id: videoId,
                    part: 'statistics'
                }
            });

            const title = m.name;
            const image = m.image;
            const viewCount = parseInt(response.data.items[0].statistics.viewCount);

            return { title, image, viewCount };
        }));

        const sortedData = videoData.sort((a, b) => b.viewCount - a.viewCount).slice(0, 5);

        res.status(200).json(sortedData);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}


const topFiveSeries = async(req, res) => {
    try {
        const series = await Series.findAll({
            include: [{ model: Episodios, where: { numEpisodio: 1 } }]
        });

        const episodeIds = [];

        series.forEach(s => {
            const episode = s.Episodios[0];
            if (episode) {
                const videoUrl = new URL(episode.linkVideo);
                const videoId = videoUrl.searchParams.get('v');
                episodeIds.push(videoId);
            }
        });

        const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
            params: {
                key: apiKey,
                id: episodeIds.join(','),
                part: 'statistics'
            }
        });

        const videoData = response.data.items.map((item, index) => {
            const seriesTitle = series[index].titulo;
            const seriesImage = series[index].image; 
            const viewCount = parseInt(item.statistics.viewCount);
            return { seriesTitle, seriesImage, viewCount };
        });

        const sortedData = videoData.sort((a, b) => b.viewCount - a.viewCount).slice(0, 5);

        res.status(200).json(sortedData);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = {topFiveMovie, topFiveSeries}