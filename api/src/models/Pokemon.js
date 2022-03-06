const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life:{
      type: DataTypes.INTEGER,
    },
    attack:{
      type: DataTypes.INTEGER,
    },
    defense:{
      type: DataTypes.INTEGER,
    },
    speed:{
      type: DataTypes.INTEGER,
    },
    height: {
      type: DataTypes.INTEGER,
    },
    weight:{
      type: DataTypes.INTEGER
    },
    img:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://c.tenor.com/KsRU6YeapccAAAAC/pikachu-gun.gif'
    },
    inDB: { //Me va a servir para saber si fue creado en la base de datos o no por defecto se encuentra en true.
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  });
};
