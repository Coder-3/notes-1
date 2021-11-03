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
  editNoteButton.onclick = () => renderEditNote(note)
  buttonContainer.appendChild(editNoteButton)

  contentContainer.appendChild(buttonContainer)
}

const renderEditNote = note => {
  let noteTitleInputElement = document.getElementById('newNoteTitle')
  let noteContentInputElement = document.getElementById('newNoteContent')
  let addNoteButtonElement = document.getElementById('addNoteButton')

  noteTitleInputElement.value = note.title
  noteContentInputElement.value = note.content

  addNoteButtonElement.innerHTML = 'save edit'
  addNoteButtonElement.onclick = () => handleEditNote(note.id)
}