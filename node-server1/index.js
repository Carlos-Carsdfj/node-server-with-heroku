const express = require('express')
const cors = require('cors')
const logger = require('./loggersResponse')
const app = express()

app.use(cors())
app.use(express.json())

app.use(logger)

var notes = [
    {
        id: 1,
        content: 'HTML is easy',
        date: '2019-05-30T17:30:31.098Z',
        important: true
    },
    {
        id: 2,
        content: 'Browser can execute only JavaScript',
        date: '2019-05-30T18:39:34.091Z',
        important: false
    },
    {
        id: 3,
        content: 'GET and POST are the most important methods of HTTP protocol',
        date: '2019-05-30T19:20:14.298Z',
        important: true
    }
]


// app.use(express.static(__dirname + '/public/'));

app.get('/',(request,response)=>{

    response.send('<h1>Hi Carsdfj<h1>')
})
app.get('/api/notes',(request,response)=>{

    response.json(notes)
})
app.get('/api/notes/:id',(request,response)=>{

    let id = Number(request.params.id)

    let note = notes.find(note => note.id === id)

    if(note){
        response.json(note)
    }else{
        response.status(404).end()
    } 
 
})




app.delete('/api/notes/:id',(request,response)=>{
    //let id = parseInt(request.params.id, 10)
    let id = Number(request.params.id)

    notes = notes.filter(nota=> nota.id !=id)
    response.status(204).end()


})

app.post('/api/notes',(request,response)=>{
    let reqNote = request.body
    let isNew = notes.some(note=>note.content === reqNote.content)
    if(isNew){
        response.json(notes.find(note => reqNote.content === note.content))
    }else{

        let ids = notes.map( note => note.id)
        let maxId = Math.max(...ids)


        let newNote = {

            id: maxId+1,
            content: reqNote.content,
            date: new Date().toISOString(),
            important: typeof reqNote.important != 'undefined' ? reqNote.important : false,


        }
   

        notes = notes.concat(newNote)
        // notes = [...notes,newNote];

        response.json(newNote)
    }
})


app.use((request,response)=>{
    response.status(404).json({
        status: 'not found'
    })


})

const PORT = process.env.PORT || 3001

app.listen(PORT, function() {
    console.log('Servidor web escuchando en el puerto ${PORT}')
})