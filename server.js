const express = require("express")
const server = express()

server.get("/", function(req, res){
    return res.send("Olá Mundo!node se")
})

server.listen(3000, function(){
    console.log("Iniciei o servido!")
})