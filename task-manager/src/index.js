const express = require('express')
require('./db/mongoose')
const bcrypt = require('bcryptjs')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// Configure express to automatically parse the incoming requests as JSON
app.use(express.json())

// Configure Router
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})

const myFunction = async () => {
  const password = 'Red123'
  const hashedPassword = await bcrypt.hash(password, 8)

  // check if given password matches the store hashedPassword. Return TRUE or FALSE.
  const isMatch = await bcrypt.compare('Red123', hashedPassword)

}

myFunction()
