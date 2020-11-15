const phonebookRouter = require('express').Router()
const Contact = require('../models/contact')

    phonebookRouter.get('/', (req, res) => {
        Contact.find({}).then(contacts => {
        res.json(contacts)
        })
    })
    
    phonebookRouter.get('/info', (req, res) => {
    
        Contact.find({})
                .then(contacts => {
                    res.send(
                    `<p>Phonebook has info for ${contacts.length} people.</p>
                    <p>${new Date()}</p>`
                    )
        })
    })
    
    phonebookRouter.get('/:id', (request, response, next) => {
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
    
    phonebookRouter.delete('/:id', (request, response, next) => {
        Contact.findByIdAndRemove(request.params.id)
            .then(result => {
            response.status(204).end()
            })
            .catch(error => next(error))
    })
    
    phonebookRouter.post('/', (request, response, next) => {
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
    
        phonebookRouter.put('/:id', (request, response, next) => {
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

module.exports = phonebookRouter