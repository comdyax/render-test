const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://Cody:${password}@testfso.kflgwcn.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

/**
const note = new Note({
  content: 'Note nr 3 - Is Best',
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  console.log(result);
  mongoose.connection.close()
})
 */

Note.find({ important: false }).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})