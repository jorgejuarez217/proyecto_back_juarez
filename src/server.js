const express = require('express')
const app = express()
const rutas = require('./routes/index')
const puerto =process.env.PORT||8080     
const path = require('path')
const {engine}= require("express-handlebars")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.engine(
//     "hbs",
//     engine({
//         extname:".hbs",
//         defaultLayout:'index.hbs',
//         layoutsDir:__dirname + "/views/layouts",
//         partialsDir:__dirname + '/views/partials/'

//     })
// );
// app.set('views', path.join(__dirname, './views'))
// app.set('view engine', 'hbs')

app.use('/api', rutas)

const error404= (req, res,next)=>{
    let mensajeError={
        error : "-2",
        descripcion: `ruta: ${req.url} método: ${req.method} no implementado`
    }
    res.status(404).json( mensajeError)
    next()
} 
//Ruta NO encontrada
app.use(error404)


// app.use((error, req, res) => {
//     res.status(error.httpStatusCode).send(error)
// })

const server = app.listen(puerto, (err) => {
    if(err) {
        console.log(`Se produjo un error al iniciar el servidor: ${err}`)
    } else {
        console.log(`Servidor escuchando puerto: ${puerto}`)
    }
})