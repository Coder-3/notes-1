let notes = []

const filteredNotes = () => {
  let searchString = document.getElementById('searchNotes').value

  if (searchString) {
    return notes.filter(note => note.title.toLowerCase().includes(searchString.toLowerCase()))
  }

  return notes
}

const renderTitles = () => {
  let list = document.getElementById('titlesList')
  list.innerHTML = ''

  filteredNotes().forEach((note, index) => {
    let item = document.createElement('li')
    item.appendChild(document.createTextNode(note.title))
    item.addEventListener('click', () => {
      renderNoteContent(note)
    })
    list.appendChild(item)
  })
}

const renderNoteContent = note => {
  let contentContainer = document.getElementById('noteContent')
  contentContainer.innerHTML = ''

  let header = document.createElement('h2')
  const noteTitle = document.createTextNode(note.title)
  header.appendChild(noteTitle)

  contentContainer.appendChild(header)
  contentContainer.appendChild(document.createTextNode(note.content))

  const buttonContainer = document.createElement('div')

  const deleteNoteButton = document.createElement('button')
  deleteNoteButton.innerHTML = 'delete'
  deleteNoteButton.onclick = () => handleDeleteNote(note.id)
  buttonContainer.appendChild(deleteNoteButton)

  const editNoteButton = document.createElement('button')
  editNoteButton.innerHTML = 'edit'
  editNoteButton.onclick = () => editNote(note)
  buttonContainer.appendChild(editNoteButton)

  contentContainer.appendChild(buttonContainer)
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

const editNote = note => {
  let noteTitleInputElement = document.getElementById('newNoteTitle')
  let noteContentInputElement = document.getElementById('newNoteContent')
  let addNoteButtonElement = document.getElementById('addNoteButton')

  noteTitleInputElement.value = note.title
  noteContentInputElement.value = note.content

  addNoteButtonElement.innerHTML = 'save edit'
  addNoteButtonElement.onclick = () => handleEditNote(note.id)
}

const initialize = async () => {
  notes = await getNotesService()
  renderTitles()
  renderNoteContent(notes[0])
}

window.onload = () => initialize()