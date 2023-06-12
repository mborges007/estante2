const Sequelize = require("sequelize");
const Genero = require("../genero/Genero");
const connection = require ("../database/database");



const Livro = connection.define ('livro',{
    id_livro:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    nome_livro:{
        type: Sequelize.STRING(45),
        allowNull: false
    },
    modal_livro:{
        type: Sequelize.STRING(45),
        allowNull: false
    },
    ano_livro:{
        type: Sequelize.INTEGER(4),
        allowNull: false
    },
    autor_livro:{
        type: Sequelize.STRING(45),
        allowNull: false
    },
    idioma_livro:{
        type: Sequelize.STRING(12),
        allowNull: false
    }

 

},{freezeTableName: true});

Genero.hasMany(Livro);
Livro.belongsTo(Genero);


Livro.sync({force:false})
    .then(()=> {
    console.log ("TABELA LIVRO CRIADA")
})

module.exports = Livro;