const fs = require('fs')
const chalk = require('chalk')

const { log } = console

const addNote = (title, body) => {
  // 1. Load data
  const notes = loadNotes()
  const duplicateNote = notes.find((note) => note.title === title)

  debugger

  if (!duplicateNote) {
    // 2. Modify data
    notes.push({
      title,
      body,
    })

    // 3. Overwrite the original data
    saveNotes(notes)
    log(chalk.green.inverse('New note added'))
  } else {
    log(chalk.red.inverse('Note title taken'))
  }

  log(notes)
}

const removeNote = (title) => {
  const notes = loadNotes()
  const notesToKeep = notes.filter((note) => note.title !== title)

  if (notes.length > notesToKeep.length) {
    log(chalk.green.inverse('Note removed'))
    saveNotes(notesToKeep)

    log(notesToKeep)
  } else {
    log(chalk.red.inverse('No note found'))
  }
}

const listNotes = () => {
  const notes = loadNotes()
  log(chalk.green.inverse('Your notes'))

  notes.map((note) => log(note.title))
}

const readNote = (title) => {
  const notes = loadNotes()
  const note = notes.find((note) => note.title === title)

  if (note) {
    log(chalk.inverse(note.title))
    log(note.body)
  } else {
    log(chalk.red.inverse('No note found'))
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    return JSON.parse(dataBuffer)
  } catch (error) {
    return []
  }
}

module.exports = { addNote, removeNote, listNotes, readNote }
