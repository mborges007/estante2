const Sequelize = require("sequelize");
const connection = require ("../database/database");

const Usuario = connection.define ('usuario',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    nome:{
        type: Sequelize.STRING(40),
        allowNull: false
    },
    data_nasc:{
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING(40),
        allowNull: false
    },
    senha:{
        type: Sequelize.STRING(12),
        allowNull: false
    }   
    
},{freezeTableName: true});


Usuario.sync({force: false})
    .then(()=> {
    console.log ("TABELA USUARIO CRIADA")
})

module.exports = Usuario;