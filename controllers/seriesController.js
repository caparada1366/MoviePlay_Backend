const {Series} = require('../config/database');

const getSeries = async (req, res) => {
    //Filtrar por genero...
    //Filtrar por nombre.. 
    //Ordenar por calificacion..
    //Ordenar por orden alfabetico..
    try {
        const { genres, name, ordenAlpha, oredenPuntuacion, page } = req.query;
        const pageSize = 10;
        const numberPages = parseInt(page) || 1;
        const offSet = (numberPages -  1) * pageSize;

        const series = await Series.findAll({
            offset: offSet,
            limit: pageSize,

        });

    } catch (error) {
        
    }
};

module.exports = {
    getSeries
};