let notes = [
  {
    title: 'note one',
    content: 'ONE ONE Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sollicitudin neque ultrices tristique sollicitudin. Nulla facilisi. Vivamus ut tempor ipsum, et ultricies elit. Curabitur facilisis fringilla blandit. Donec et mi laoreet, aliquet neque sed, mattis nibh. Nam et ligula risus. Donec ac risus id est efficitur porttitor et quis ante. Donec eget velit id dui tempor vehicula vitae at massa.'
  },
  {
    title: 'really long note title example so that I can see how it renders',
    content: 'TWO TWO Proin finibus diam nec metus consequat, eu tristique justo pulvinar. Nulla tincidunt lobortis lacus, vitae ultricies purus laoreet et. Donec vitae quam a nisl viverra porta. Phasellus vitae tincidunt risus. Sed imperdiet metus et egestas laoreet. Sed quis libero vehicula, commodo justo non, sollicitudin purus. Vestibulum sodales, ligula et scelerisque pellentesque, neque diam euismod lacus, nec viverra ex ipsum a diam. In hac habitasse platea dictumst. Integer eget dapibus mauris. Suspendisse eu arcu maximus, blandit leo eget, pulvinar eros.'
  },
  {
    title: 'rice noodle recipe',
    content: 'THREE THREE Nam malesuada ligula sed convallis pellentesque. In eget justo aliquet, sollicitudin leo sed, accumsan nisl. Phasellus maximus suscipit nulla, a bibendum justo dignissim nec. Nam quis turpis malesuada, sollicitudin nulla quis, convallis purus. Vivamus commodo vitae libero ac interdum. Quisque accumsan laoreet iaculis. Nam tristique pellentesque semper. Quisque congue ipsum at porta hendrerit. Pellentesque placerat eget urna in cursus. Aliquam dignissim vitae velit sed pharetra. Vestibulum eu massa laoreet, tincidunt nisl ut, eleifend ex. Integer accumsan, libero quis mattis lacinia, orci augue ultricies mi, sed interdum ex ligula sollicitudin nibh. Sed ante neque, iaculis vel gravida eu, molestie vel diam. Fusce maximus condimentum auctor. Morbi a condimentum dui.'
  }
]

let selectedNote = 0

const filteredNotes = () => {
  let searchString = document.getElementById('searchNotes').value

  if (searchString) {
    return notes.filter(note => note.title.includes(searchString))
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
      selectedNote = index
      renderNoteContent()
    })
    list.appendChild(item)
  })
}

const renderNoteContent = () => {
  let contentContainer = document.getElementById('noteContent')
  contentContainer.innerHTML = ''

  let header = document.createElement('h2')
  const noteTitle = document.createTextNode(notes[selectedNote].title)
  header.appendChild(noteTitle)

  contentContainer.appendChild(header)
  contentContainer.appendChild(document.createTextNode(notes[selectedNote].content))

  const deleteButtonContainer = document.createElement('div')
  const deleteNoteButton = document.createElement('button')
  deleteNoteButton.innerHTML = 'delete'
  deleteNoteButton.onclick = () => deleteNote()
  deleteButtonContainer.appendChild(deleteNoteButton)
  contentContainer.appendChild(deleteButtonContainer)
}

const addNote = () => {
  const titleElement = document.getElementById('newNoteTitle')
  const contentElement = document.getElementById('newNoteContent')

  const newNote = {
    title: titleElement.value,
    content: contentElement.value
  }

  titleElement.value = ''
  contentElement.value = ''

  notes = notes.concat(newNote)
  renderTitles()
  renderNoteContent()
}

const deleteNote = () => {
  notes.splice(selectedNote, 1)
  selectedNote = 0
  renderTitles()
  renderNoteContent()
}

renderTitles()
renderNoteContent()