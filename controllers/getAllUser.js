const {Usuario} = require('../config/database')

const getAllUser = async(req, res) => {
    try {
        const response = await Usuario.findAll()
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
};

module.exports = {getAllUser}