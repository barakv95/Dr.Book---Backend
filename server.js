const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())


const jsonParser = bodyParser.json()
const gBooks = require('./data/book.json')


//ROUTES

//Query
app.get('/api/book', (req, res)=>{
    try{
        res.send(gBooks)
    }catch(err){
        console.log('Cannot Find Books:', err)
        
    }
})

//Get By ID
app.get('/api/book/:id', (req, res)=>{
    try{
        const {id} = req.params
        const book = gBooks.find(book => book._id === id)
        res.send(book)
    }catch(err){
        console.log('Cannot Find Book:', err)
        
    }
})

//Remove
app.delete('/api/book/:id', (req, res)=>{
    try{
        const {id} = req.params
        console.log('before gBooks:', gBooks.length)
        const bookIdx = gBooks.findIndex(book => book._id === id)
        gBooks.splice(bookIdx, 1)
        console.log('after gBooks:', gBooks.length)
        res.send(gBooks)
    }catch(err){
        console.log('Cannot Delete Book:', err)
    }
})

//Update
app.put('/api/book', jsonParser, (req, res)=>{
    try{
        const bookToSave = req.body
        const bookIdx = gBooks.findIndex(book => book._id === bookToSave._id)
        gBooks.splice(bookIdx, 1, bookToSave)
        res.send(gBooks[bookIdx])
    }catch(err){
        console.log('Cannot Update Book:', err)
    }
})








app.listen(3000);