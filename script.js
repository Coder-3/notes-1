let notes = []

const filteredNotes = () => {
  let searchString = document.getElementById('searchNotes').value

  if (searchString) {
    return notes.filter(note => note.title.toLowerCase().includes(searchString.toLowerCase()))
  }

  return notes
}

const handleAddNote = async () => {
  const titleElement = document.getElementById('newNoteTitle')
  const contentElement = document.getElementById('newNoteContent')

  const newNoteObject = {
    title: titleElement.value,
    content: contentElement.value
  }

  titleElement.value = ''
  contentElement.value = ''

  await addNoteService(newNoteObject)

  await initialize()
}

const handleDeleteNote = async noteId => {
  await deleteNoteService(noteId)
  initialize()
}

const handleEditNote = async noteId => {
  let noteTitleInputElement = document.getElementById('newNoteTitle')
  let noteContentInputElement = document.getElementById('newNoteContent')
  let addNoteButtonElement = document.getElementById('addNoteButton')

  let editedNoteObject = {
    title: noteTitleInputElement.value,
    content: noteContentInputElement.value
  }

  noteTitleInputElement.value = ''
  noteContentInputElement.value = ''

  addNoteButtonElement.innerHTML = 'add note'
  addNoteButtonElement.onclick = () => handleAddNote()

  await editNoteService(noteId, editedNoteObject)

  await initialize()
}

const initialize = async () => {
  notes = await getNotesService()
  renderTitles()
  renderNoteContent(notes[0])
}

window.onload = () => initialize()