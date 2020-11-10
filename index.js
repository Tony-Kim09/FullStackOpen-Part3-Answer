require('dotenv').config()
const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const Contact = require('./models/contact')

const morgan = require('morgan')
morgan.token('post', function (req, res) { return JSON.stringify(req.body)})

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':post :method :url :response-time'))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the phonebook!</h1>')
})

app.get('/api/persons', (req, res) => {
  Contact.find({}).then(contacts => {
    res.json(contacts)
  })
})

app.get('/info', (req, res) => {

    Contact.find({})
           .then(contacts => {
              res.send(
                `<p>Phonebook has info for ${contacts.length} people.</p>
                <p>${new Date()}</p>`
              )
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Contact.findById(request.params.id)
      .then(contact => {
        if (contact) {
          response.json(contact)
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
  })

app.delete('/api/persons/:id', (request, response, next) => {
    Contact.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    
    Contact.find({name: body.name})
          .then(contacts => {
            if (contacts.length > 0){
              response.status(400).send({ error: 'name already exists'})
            } else {
              const newContact = new Contact({
                name: body.name,
                number: body.number,
              })
            
              newContact.save()
                .then(contact => {
                  response.json(contact)
                })
                .catch(error => next(error))
            }
          })
  })

  app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const updatedContact = {
      name: body.name,
      number: body.number,
    }
  
    Contact.findByIdAndUpdate(request.params.id, updatedContact, {runValidators: true, context: 'query', new: true })
      .then(contact => {
        response.json(contact)
      })
      .catch(error => next(error))
  })

  //Middleware error handling for unknown destinations
  const unknownEndPoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint'})
  }

  app.use(unknownEndPoint)

  //Error handler

  const errorHandler = (error, request, response, next) => {

    if (error.name === 'CastError'){
      return response.status(400).send({ error: 'malformatted id'})
    } else if (error.name === 'ValidationError'){
      return response.status(400).json({error: error.message})
    }
  }
  app.use(errorHandler)