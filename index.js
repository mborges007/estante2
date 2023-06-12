const express = require("express");
const app = express();
const session = require("express-session");
const connection = require("./database/database");
// /*********************************
//   Chamando o controller
// ********************************/
const generoController = require("./genero/GeneroController");
const usuarioController = require("./usuario/UsuarioController");
const livroController = require("./livro/LivroController");
const leController = require("./le/LeController");

// /*********************************
//   Chamando a Tabela
// ********************************/
const Genero = require ("./genero/Genero");
const Usuario = require ("./usuario/Usuario");
const Livro = require ("./livro/Livro");
const Le = require ("./le/Le");

//Informa ao Express que irá utilizar o EJS
app.set('view engine', 'ejs');
//app.set('view engine', 'pug');

//Sessions
app.use(session({
  secret: "eteccursoinfonet",  //Palavra chave qualquer para aumentar a segurança do servidor
  cookie: {maxAge: 1800000}    //Tempo de expiração da sessão, valor em milisegundos - 30min
}));

//Exemplo de milisegundos
//1 seg  = 1000
//60 seg = 60000 (1minuto)

//Informando que iremos utilizar arquivos estáticos
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//Conectando ao banco de dados
connection
       .authenticate()
       .then(() => {
         console.log("Conexão com o banco de dados realizada com sucesso!")
       })
       .catch((msgErro) => {
          console.log(msgErro);
       });

/*********************************
  Usar o controller
********************************/
app.use("/", generoController);
app.use("/", usuarioController);
app.use("/", livroController);
app.use("/", leController);

/*********************************
  Testando sessões
********************************/
app.get("/session", (req, res) => {
  req.session.nome = "Thiago Dias";
  req.session.curso = "Infonet";

  res.send("Sessão gerada para testes");
});

app.get("/leitura", (req, res) => {
  res.json({
    nome: req.session.nome,
    curso: req.session.curso
  })
});



app.get ("/quemsomos", function (req,res){
    res.render ('quemsomos')

})

app.get ("/pdf", function (req,res){
    res.render ('pdf')

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

app.get ("/indicacaodomes", function (req,res){
  res.render ('indicacaodomes')

})

app.get ("/indicacaoeditor", function (req,res){
  res.render ('indicacaoeditor')

})

/*********************************
  Criando conexão
********************************/
app.listen(4000, () => {
    console.log("Servidor iniciado com sucesso!")    
})

connection
       .authenticate()
       .then(() => {
         console.log("Conexão com o banco de dados realizada com sucesso!")
       })
       .catch((msgErro) => {
          console.log(msgErro);
       });