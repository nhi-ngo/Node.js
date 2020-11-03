// const myName = require('./utils.js')
// console.log(myName)

// const add = require('./utils.js')
// const sum = add(4,2)
// console.log(sum)

const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

const { log } = console

// const note = getNotes('My first note...')
// log(note)

/* VALIDATION */
// const validator = require('validator')
// log(validator.isEmail('nhingo.y@gmail.com'))

/* CHALK */
// log(chalk.blue('Hello world!'));
// log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'));
// log(chalk.hex('#DEADED').bold('Bold gray!'));
// log(chalk.green.inverse.bold('Green Success'))

/* Getting inputs via CLI */
// const command = process.argv[2]

// if (command === 'add') {
//   console.log('Adding note!');
// } else if (command === 'remove') {
//   console.log('Removing note!');
// }

// log(process.argv);

/* YARGS */

/* Customize yargs version */
yargs.version('1.1.0')

// Add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true, // choice to require a title
      type: 'string',
    },
    body: {
      describe: 'Node Body',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body)
  },
})

// Remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  handler(argv) {
    notes.removeNote(argv.title)
  },
})

// List command
yargs.command({
  command: 'list',
  describe: 'List your notes',
  handler() {
    notes.listNotes()
  },
})

// Read command
yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.readNote(argv.title)
  },
})

yargs.parse()
