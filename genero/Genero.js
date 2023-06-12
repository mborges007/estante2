const Sequelize = require("sequelize");
const connection = require ("../database/database");

const Genero = connection.define ('genero',{
    id_genero:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    nome_genero:{
        type: Sequelize.STRING(25),
        allowNull: false
    }
},{freezeTableName: true});

Genero.sync({force:false})
    .then(()=> {
    console.log ("TABELA GENERO CRIADA")
},)

module.exports = Genero;