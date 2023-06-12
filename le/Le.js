const Sequelize = require("sequelize");
const connection = require ("../database/database");
const Usuario = require("../usuario/Usuario");
const Livro = require("../livro/Livro");

const Le = connection.define ('Le',{
    id_leitura:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    datainicio_leitura:{
        type: Sequelize.DATE,
        allowNull: false
    }
   /* comentario_leitura:{
        type: Sequelize.TEXT('medium'),
        allowNull: false
    },
    estrelas_leitura:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
  */

},{freezeTableName: true});


Usuario.belongsToMany(Livro, { through: 'Le' });
Livro.belongsToMany(Usuario, { through: 'Le' });


Le.sync({force:false})
    .then(()=> {
    console.log ("TABELA LE CRIADA")
})

module.exports = Le;




