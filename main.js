const express = require('express')
const Contenedor = require('./Contenedor')

const app = express()

const producto = {
	title : "Lapicera",
	price : 15,
	thumbnail: "https://img.icons8.com/emoji/48/000000/pen-emoji.png"
}

const producto2 = {
	title : "Cuaderno",
    price : 10.5,
	thumbnail: "https://img.icons8.com/officel/16/000000/book.png"
}

const producto3 = {
	title : "Mochila",
	price : 200,
	thumbnail: "https://img.icons8.com/dusk/64/000000/backpack.png"
}



const container = new Contenedor('productos.txt')



// container_1.save(producto)
// container_1.save(producto3)
// container_1.deleteById(2)
// container_1.getAll().then(productos => console.log(productos))

const getRandomArbitrary = (min, max) =>{
    return Math.random() * (max - min) + min;
  }


app.get('/productos', (req, res) =>{
    container.getAll()
    .then(productos => res.status(200).send(productos))
})

app.get('/productoRandom', (req, res) => {
    container.getAll().then(productos => {
        if (!productos.length) {
            res.send([])
            return
        }
        const index = Math.floor(getRandomArbitrary(0, productos.length))
        res.send(productos[index])
    })
})

app.listen(8080,()=>{
    console.log('Servidor Iniciado')
})