const {Usuario, Multimedia, Series} = require('../../config/database')

const getFavs = async(req, res) =>{
    const{email} = req.query

    try {
        const usuario = await Usuario.findOne({
            where: {email: email},
            include: [
                {model: Multimedia, attributes: ["name", "image", "price"]},
                {model: Series, attributes: ["titulo", "image", "price"]}
                ],
                attributes: ["email"]
        })
        // if(req.query.deleted === "true"){
        //     usuario = await usuario.reload();
        // }
        res.status(200).send(usuario) 
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

module.exports = getFavs