const fs = require('fs')

// 1. Load and parse the JSON data
const dataBuffer = fs.readFileSync('1-json.json')
const user = JSON.parse(dataBuffer)
console.log(user)

// 2. Change the name and age property
user.name = 'Nhi Ngo'
user.hobbies = 'Running'
user.age = 31

// 3. Stringify the changed object and overwrite the original file
const userJSON = JSON.stringify(user)
fs.writeFileSync('1-json.json', userJSON)

// 4. Check the JSON file for new data
