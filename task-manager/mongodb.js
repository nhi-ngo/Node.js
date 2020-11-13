// CRUD operations: create read update delete

const { MongoClient, ObjectID } = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'task-manager'

// Use connect method to connect to the server
MongoClient.connect(connectionUrl, { useUnifiedTopology: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database!')
  }

  const db = client.db(dbName)

  /* Find a document by ObjectId */
  // db.collection('users').findOne(
  //   { _id: new ObjectID('5fad93715f8c4f384bc6fb4f') },
  //   (error, user) => {
  //     if (error) {
  //       return console.log('Unable to fetch user')
  //     }

  //     console.log(user)
  //   }
  // )

  /* Delete multiple documents */
  // db.collection('users')
  //   .deleteMany({
  //     city: 'Albany',
  //   })
  //   .then((result) => {
  //     console.log(result)
  //   })
  //   .catch((error) => console.log(error))

  /* Update a document */
  // db.collection('users')
  //   .updateOne(
  //     { _id: new ObjectID('5fad9801c680d039da862d99') },
  //     { $set: { name: 'Janice' } }
  //   )
  // .then((result) => {
  //   console.log(result)
  // })
  // .catch((error) => console.log(error))

  /* Update multiple documents */
  // db.collection('tasks')
  //   .updateMany({ completed: false }, { $set: { completed: true } })
  //   .then((result) => {
  //     console.log(result.modifiedCount)
  //   })
  //   .catch((error) => console.log(error))

  /* Find multiple documents */
  // db.collection('users')
  //   .find({ name: 'Nhi' })
  //   .toArray((error, users) => {
  //     if (error) {
  //       return console.log('Unable to fetch users')
  //     }

  //     console.log(users)
  //   })

  // db.collection('users')
  //   .find({ name: 'Nhi' })
  //   .count((error, count) => {
  //     console.log(count)
  //   })

  /* Insert a document */
  // db.collection('users').insertOne({
  //   name: 'Eva',
  //   city: 'Albany',
  //   age: '31',
  // })

  /* Insert multiple documents */
  // db.collection('users').insertMany(
  //   [
  //     { name: 'Jen', city: 'Albany', age: 31 },
  //     { name: 'Henry', city: 'Austin', age: 28 },
  //     { name: 'Shawn', city: 'New York', age: 27 },
  //   ],
  //   (error, result) => {
  //     if (error) {
  //       return console.log('Unable to insert users')
  //     }

  //     console.log(result.ops)
  //   }
  // )
})
