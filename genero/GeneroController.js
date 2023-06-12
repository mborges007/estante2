const express = require ("express");
const router = express.Router();
const Genero = require ("./Genero");


router.post ("/salvargenero",(req,res)=>{
    var genero = req.body.salvargenero
  

    Genero.create({
        nome_genero: genero,
    }).then(()=>{
        res.redirect("/salvargenero")
    })
})





router.get("/genero", (req,res)=>{
    res.render("genero");
})

module.exports = router;