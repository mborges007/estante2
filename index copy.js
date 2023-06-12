const express = require("express");
const app = express();
const session = require("express-session");
const connection = require("./database/database");

//controllers
const generoController = require("./genero/GeneroController");
const usuarioController = require("./usuario/UsuarioController");
const livroController = require("./livro/LivroController");
const leController = require("./le/LeController");
//constantes
const Genero = require ("./genero/Genero");
const Usuario = require ("./usuario/Usuario");
const Livro = require ("./livro/Livro");
const Le = require ("./le/Le");
//ejs
app.set('view engine', 'ejs');
//serializada dados enviados
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))






//funcionamento de cookies e session


app.use(session({
    secret: "eteccursoinfonet",  //Palavra chave qualquer para aumentar a segurança do servidor
    cookie: {maxAge: 1800000}    //Tempo de expiração da sessão, valor em milisegundos - 30min
  }));





app.get ("/quemsomos", function (req,res){
    res.render ('quemsomos')

})

app.get ("/pdf", function (req,res){
    res.render ('pdf')

})

app.get ("/pdf2", function (req,res){
    res.render ('pdf2')

})






app.get ("/cadastrodelivros",(req,res)=>{
    Genero.findAll({raw:true,order:[
        ['nome_genero','ASC']
    ]}).then(genero=>{
        res.render("cadastrodelivros",{
            genero: genero
        })
    })
})


app.get ("/cadastrodegenero", function (req,res){
    res.render ('cadastrodegenero')
    
})   
    

app.get ("/meuperfil", function (req,res){
    
    res.render ('meuperfil', {
        

    })
    
})


//conexao
app.listen (4000, function(erro) {
    if (erro){
        console.log ("erro")
    }
    else {
        console.log ("servidor OK")
    }
})



//informar q vai usar esse arq para rotas
app.use("/", generoController);
app.use("/", usuarioController);
app.use("/", livroController);
app.use("/", leController);


//Conexão com o Database
connection
       .authenticate()
       .then(() => {
         console.log("Conexão com o banco de dados realizada com sucesso!")
       })
       .catch((msgErro) => {
          console.log(msgErro);
       });


       