const express = require("express")
const server = express()

server.use(express.static("public"))

server.use(express.urlencoded({extended:true}))

const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    nocache: true
})

// configurar banco de dados
const Pool = require("pg").Pool
const db = new Pool({
    user: 'postgres',
    password: '123',
    host: 'localhost',
    port: 5432,
    database: 'Doadores'
})
/*
const donors = [
    {
        name: "Everton Fabris",
        blood: "A+"
    },
    {
        name: "Aline Ferruci",
        blood: "B+"
    },
    {
        name: "Felipe Dilon",
        blood: "AB+"
    },
    {
        name: "Jacinto",
        blood: "O-"
    }
]*/

server.get("/", function(req, res){
    db.query(`SELECT * FROM public."Doadores"`, function(err, result){
        if (err) return res.send("Erro de banco ARGH")
        const donors = result.rows
        return res.render("index.html", { donors })
    })
})

server.post("/", function(req,res){
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    if (name == "" || email == "" || blood == ""){
        return res.send("Todos os campos são obrigatórios.")
    }
    // colocar valores novos no banco
    const query = `INSERT INTO public."Doadores" ("name", "email", "blood") VALUES ($1, $2, $3)`

    const values = [name, email, blood]

    db.query(query, values, function(err){
        if (err)
            return res.send(err.message)
        //fluxo ideal
        return res.redirect("/")
    })
})

server.listen(3000, function(){
    console.log("Iniciei o servido!")
})