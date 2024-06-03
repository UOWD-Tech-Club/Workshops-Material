const express = require('express')
const app = express()
const path = require('path')
var bodyParser = require('body-parser')
const auth = require('./middleware/auth')

const port = 3000

var jsonParser = bodyParser.json()

let cats = [
    { id: 0, name: "Bob", "specie": "Calico" },
    { id: 1, name: "Alice", "specie": "Calico" }
]

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/dogImage', (req, res) => {
    const options = {
        root: path.join(__dirname)
    }

    res.sendFile("./images/dog.jpg", options)
})

app.get('/catImage', (req, res) => {
    const options = {
        root: path.join(__dirname)
    }

    res.sendFile("./images/cat.jpg", options)
})

app.get('/cats', auth, (req, res) => {
    res.send(cats)
})

app.get('/cats/:id', auth, (req, res) => {
    let id = req.params.id
    let cat;

    for (i = 0; i < cats.length; i++) {
        if (cats[i].id == id) {
            cat = cats[i]
            break
        }
    }
    res.send(cat)
})

app.post('/cats', jsonParser, auth, (req, res) => {
    let cat = req.body

    cats.push(cat)

    res.send({ 'message': 'cat added', 'data': cat })
})

app.put('/cats/:id', jsonParser, auth, (req, res) => {
    let updateCat = req.body
    let id = req.params.id

    for (i = 0; i < cats.length; i++) {
        if (cats[i].id == id) {
            cats[i] = updateCat
            break
        }
    }

    res.send({ 'message': 'cat updated', 'data': updateCat })
})

app.delete('/cats/:id', auth, (req, res) => {
    let id = req.params.id

    for (i = 0; i < cats.length; i++) {
        if (cats[i].id == id) {
            cats.splice(i, 1)
            break
        }
    }

    res.send({ 'message': 'cat deleted' })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
