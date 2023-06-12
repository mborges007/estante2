const express = require ("express");
const router = express.Router();
const Usuario = require("../usuario/Usuario");
const Livro = require("../livro/Livro");
const connection = require ("../database/database");
const Le = require("./Le");

router.get("/le", (req,res)=>{
    res.send("le");
})
/*

router.get("/estante", (req, res) =>{
    var id = req.session.usuario.id;

    Usuario.findByPk(id)
    .then(usuario=> {
        Le.findAll({raw:true,order:[
            ['autor_livro','ASC']
        ]})
        .then(livro=> {
            res.render("estante",{
                livro:livro,
                usuario:usuario
            })
        }) 
    })
})


Le.create ({
    datainicio_leitura
})

*/

   



module.exports = router;