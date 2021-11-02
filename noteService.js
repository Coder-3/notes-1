const url = 'https://boiling-plateau-76881.herokuapp.com/api/notes'

const getNotesService = async () => {
  const notes = await axios.get(url)
  return notes.data
}

const getNoteService = async id => {
  const note = await axios.get(`${url}/${id}`)
  return note.data
}

const deleteNoteService = async id => {
  return await axios.delete(`${url}/${id}`)
}

const addNoteService = async noteObject => {
  const newNote = await axios.post(url, noteObject)
  return newNote.data
}

const editNoteService = async (id, noteObject) => {
  const editedNote = await axios.put(`${url}/${id}`, noteObject)
  return editedNote
}