const {Series} = require('../config/database')

const activeSeries = async(req, res) => {
    try {
        const { id } = req.params;
        const serie = await Series.findByPk(id);

        if(!serie) {
            return res.status(404).json({ error: "Serie no encontrada." });
        }

        serie.active = !serie.active;
        await serie.save();

        res.status(200).json({ message: "Estado de serie cambiado exitosamente." });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = activeSeries;