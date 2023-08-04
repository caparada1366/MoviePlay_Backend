const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

module.exports = (sequelize) => {
  const Episodios = sequelize.define(
    "Episodios",
    {
      episodioId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      numEpisodio: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numTemporada: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      linkVideo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duracion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Episodios;
};
