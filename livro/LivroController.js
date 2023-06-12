const express = require ("express");
const router = express.Router();
const Livro = require ("./Livro");
const connection = require ("../database/database")
const adminAuth = require("../middlewares/adminAuth")
const Usuario = require("../usuario/Usuario")



router.get("/")





router.get("/atoz", (req,res)=>{
    Usuario.findOne()
    .then(usuario=> {
    Livro.findAll({raw:true,order:[
        ['nome_livro','ASC']
    ]}).then(livro=> {
        res.render("estante",{
            livro:livro,
            usuario:usuario
        })
    })         
 })
})

router.get("/ztoa", (req,res)=>{
    Usuario.findOne()
    .then(usuario=> {
    Livro.findAll({raw:true,order:[
        ['nome_livro','DESC']
    ]}).then(livro=> {
        res.render("estante",{
            livro:livro,
            usuario:usuario
        })
    })         
 })
})

router.get("/autora", (req,res)=>{
    Usuario.findOne()
    .then(usuario=> {
    Livro.findAll({raw:true,order:[
        ['autor_livro','ASC']
    ]}).then(livro=> {
        res.render("estante",{
            livro:livro,
            usuario:usuario
        })
    })         
 })
})
router.get("/autorz", (req,res)=>{
    Usuario.findOne()
    .then(usuario=> {
    Livro.findAll({raw:true,order:[
        ['autor_livro','DESC']
    ]}).then(livro=> {
        res.render("estante",{
            livro:livro,
            usuario:usuario
        })
    })         
 })
})


  //SELECT *FROM livro ORDER BY nome_livro ASC;


  router.get("/livros", (req, res) =>{
    var id = req.session.usuario.id;

    Usuario.findByPk(id)
    .then(usuario=> {
        Livro.findAll({raw:true,order:[
            ['autor_livro','ASC']
        ]}).then(livro=> {
            res.render("livros",{
                livro:livro,
                usuario:usuario
            })
        }) 
    })
})  



router.get("/ano", (req,res)=>{
    Usuario.findOne()
    .then(usuario=> {
    Livro.findAll({raw:true,order:[
        ['ano_livro','ASC']
    ]}).then(livro=> {
        res.render("livros",{
            livro:livro,
            usuario:usuario
        })
    })         
 })
})

router.get("/titulo-livro", (req,res)=>{
    Usuario.findOne()
    .then(usuario=> {
    Livro.findAll({raw:true,order:[
        ['nome_livro','ASC']
    ]}).then(livro=> {
        res.render("livros",{
            livro:livro,
            usuario:usuario
        })
    })         
 })
})

router.get("/autor-livro", (req,res)=>{
    Usuario.findOne()
    .then(usuario=> {
    Livro.findAll({raw:true,order:[
        ['autor_livro','ASC']
    ]}).then(livro=> {
        res.render("livros",{
            livro:livro,
            usuario:usuario
        })
    })         
 })
})



router.get ("/", function (req,res){
    Livro.findAll({raw:true,order:[
       
    ]}).then(livro=> {
        res.render("index",{
            livro:livro
        })
    })          
})

router.post ("/salvarlivro",(req,res)=>{
    var titulo = req.body.titulo
    var autor = req.body.autor
    var genero = req.body.genero 
    var ano = req.body.ano
    var idioma = req.body.idioma
    var modal = req.body.modal

    Livro.create({
        nome_livro: titulo,
        autor_livro: autor,
        ano_livro: ano,
        idioma_livro: idioma,
        generoIdGenero: genero,
        modal_livro: modal
    
    
    }).then(()=>{
        res.redirect("/cadastrodelivros")
    })
})


/*
router.get ("/search", function (req,res){
    var search = req.body.search;
    
 
*/

module.exports = router;