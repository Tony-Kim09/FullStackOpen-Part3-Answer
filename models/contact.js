const mongoose = require('mongoose')
const uniqueValudator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting')

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
        .then(result =>{
            console.log('connected to MongoDB')
        })
        .catch((error) => {
            console.log('error connecting to MongoDB:', error)
        })

const phonebookSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: {
        type: String,
        minlength: 8,
        required: true
    }
})
    
phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

phonebookSchema.plugin(uniqueValudator)

module.exports = mongoose.model('Contact', phonebookSchema)