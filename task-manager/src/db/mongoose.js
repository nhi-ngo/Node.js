const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

/* Define a Model */
const { Schema } = mongoose
const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password shouldn\'t contain the word "password"')
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number')
      }
    },
  },
})

/* Access a Model */
const User = mongoose.model('User', UserSchema)

/* Instantiate a Model and Save it */
const meInstance = new User({
  name: 'Nhi',
  email: 'nhi.nxyn@gmail.com',
  password: 'Hello123!',
})

meInstance
  .save()
  .then(() => console.log(meInstance))
  .catch((error) => console.log('Error!', error))
