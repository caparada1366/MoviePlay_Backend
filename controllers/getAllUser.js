const {Usuario} = require('../config/database')

const getAllUser = async(req, res) => {
    const response = await Usuario.findAll()
    res.status(200).json(response)
};

module.exports = {getAllUser}