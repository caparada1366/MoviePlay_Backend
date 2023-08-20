const {Usuario} = require('../config/database')
const {Op} = require('sequelize')

const getAllUser = async(req, res) => {
    try {
        const {busqueda, page, genre, ordprecio, ordalfa, tipo} = req.query
        const pageNumber = parseInt(page) || 1;
        const pageSize = 10;
        const offset = (pageNumber - 1) * pageSize;
        const arrayUser = [];

        if(busqueda){
            arrayUser.push({ email: {[Op.iLike]: `%${busqueda}%`}});
        }

        const response = await Usuario.findAll({
            //where: {[Op.and]: arrayUser},
            where: arrayUser,
            order: [['id', 'ASC']],
            distinct: true, 
            offset: offset,
            limit: pageSize,
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
};

module.exports = {getAllUser}