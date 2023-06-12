const express = require ("express");
const router = express.Router();
const Usuario = require("./Usuario")
const Livro = require("../livro/Livro");
const Le = require("../le/Le");
//const adminAuth = require("../middlewares/adminAuth")
//const sessions = require('express-session');

router.get("/cadastro", (req,res)=>{
    res.render('cadastro');
})

router.get("/login", (req, res) =>{
    res.render("login");
  })

  router.get("/quemsomos2", (req, res) =>{
    var id = req.session.usuario.id;

    Usuario.findByPk(id)
    .then(usuario=> {
            res.render("quemsomos2",{
                usuario:usuario
            })
        }) 
    })



 /* router.get("/estante", (req, res) =>{
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
})*/

router.get("/meuperfil", (req, res) =>{
    var id = req.session.usuario.id;

    Usuario.findByPk(id)
    .then(usuario=> {
        Livro.findAll({raw:true,order:[
            ['autor_livro','ASC']
        ]}).then(livro=> {
            res.render("meuperfil",{
                livro:livro,
                usuario:usuario
            })
        }) 
    })
})





router.get("/estante", (req, res) =>{
    var id = req.session.usuario.id;

    Usuario.findByPk(id)
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






router.post("/authenticate", (req, res) => {
    var email = req.body.email;
    var senha = req.body.senha;

    Usuario.findOne(
        {where:{email: email}}) //primeiro email é o nome do campo que é utilizado no BD
        .then(usuario => {
           if(usuario != undefined){ //Se existir usuário
                if (senha == usuario.senha){ //Senha esta correta
                    req.session.usuario = {
                        id: usuario.id,
                        email: usuario.email
                    }
                    res.redirect("/estante")
                } else {
                    res.send("SENHA ERRADA");
                }           

           }else{
            res.send("USUARIO INDEFINIDO");
           } 
        })
});





/*router.post("/auth", (req,res) => {
    var email = req.body.email;
    var senha = req.body.senha;
    
    Usuario.findOne(
        {where:{email: email}})
        .then(usuario=>{ //usuarui existir
            if(usuario != undefined){
                if (senha == usuario.senha){  //senha correta
                    req.session.usuario = {
                        email:usuario.email,
                    }
                    res.send("DEU CERTO")
                
                }else{
                    res.send("senha incorreta");
                }
            }else{
                res.send("USUARIO INVALIDO");
            }
        })
})
*/
router.get("/logout", (req, res) =>{
    req.session.usuario = undefined
    res.redirect("/")
})




/*
router.get('/meuperfil', function(request, response) {
	// If the user is loggedin
	if (req.session.loggedin) {
		// Output username
		response.send('Welcome back, ' + request.session.usuario+ '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});  

*/










router.post ("/salvarusuario",(req,res)=>{
    var nome = req.body.nome
    var email = req.body.email    
    var senha = req.body.senha
    var nascimento = req.body.nascimento

    Usuario.create({
        nome: nome,
        data_nasc: nascimento,
        email: email,
        senha: senha,
        
    
    }).then(()=>{
        res.redirect("/")
    })
})





module.exports = router;