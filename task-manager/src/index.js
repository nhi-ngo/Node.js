const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

// Configure express to automatically parse the incoming requests as JSON
app.use(express.json())

/* User Model */

/* Create */
app.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save() // wait until the promise (data saved to database) resolve
    res.status(201).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
})

/* Read */
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({}) // wait until we find all users
    res.send(users)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.get('/users/:id', async (req, res) => {
  // console.log(req.params) // params object with id as its properties { id: '5faef180b14dc9755b668440' }
  const _id = req.params.id

  try {
    const user = await User.findById(_id)

    if (!user) {
      return res.status(400).send()
    }

    res.send(user)
  } catch (error) {
    res.status(500).send(error)
  }
})

/* Task Model */

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body)

  try {
    await task.save()
    res.status(201).send(task)
  } catch (error) {
    res.status(400).send(error)
  }
})

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.send(tasks)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const task = await Task.findById(_id)

    if (!task) {
      return res.status(404).send()
    }

    res.send(task)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
