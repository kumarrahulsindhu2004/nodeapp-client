import { useEffect, useState } from 'react'

import axios from 'axios'

import {
  FaTrash,
  FaEdit,
  FaPlus,
  FaStickyNote
} from 'react-icons/fa'


const API = 'http://localhost:5000/notes'


function App() {

  const [notes, setNotes] = useState([])

  const [title, setTitle] = useState('')

  const [content, setContent] = useState('')


  // Unique User ID
  let userId = localStorage.getItem('userId')

  if (!userId) {
    userId = Date.now().toString()

    localStorage.setItem('userId', userId)
  }


  // Fetch Notes
  const fetchNotes = async () => {

    try {

      const res = await axios.get(
        `${API}?userId=${userId}`
      )

      setNotes(res.data)

    } catch (error) {

      console.log(error)
    }
  }


  useEffect(() => {
    fetchNotes()
  }, [])


  // Add Note
  const addNote = async () => {

    if (!title || !content) {
      alert('Please fill all fields')
      return
    }


    try {

      await axios.post(API, {
        userId,
        title,
        content
      })

      setTitle('')
      setContent('')

      fetchNotes()

    } catch (error) {

      console.log(error)
    }
  }


  // Delete Note
  const deleteNote = async (id) => {

    try {

      await axios.delete(`${API}/${id}`)

      fetchNotes()

    } catch (error) {

      console.log(error)
    }
  }


  // Edit Note
  const editNote = async (note) => {

    const newTitle = prompt(
      'Edit Title',
      note.title
    )

    const newContent = prompt(
      'Edit Content',
      note.content
    )

    if (!newTitle || !newContent) return


    try {

      await axios.put(`${API}/${note._id}`, {
        title: newTitle,
        content: newContent
      })

      fetchNotes()

    } catch (error) {

      console.log(error)
    }
  }


  return (

    <div className="min-h-screen bg-slate-950 text-white p-6">

      {/* Navbar */}
      <div className="flex items-center gap-3 mb-10">

        <FaStickyNote className="text-4xl text-cyan-400" />

        <h1 className="text-4xl font-bold">
          Notes App
        </h1>

      </div>


      {/* Add Note Form */}
      <div className="bg-white/10 p-6 rounded-3xl mb-10 backdrop-blur-lg">

        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 rounded-xl bg-white/20 outline-none mb-4"
        />


        <textarea
          placeholder="Write note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-4 rounded-xl bg-white/20 outline-none mb-4 min-h-[120px]"
        />


        <button
          onClick={addNote}
          className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl flex items-center gap-2"
        >
          <FaPlus />
          Add Note
        </button>

      </div>


      {/* Notes */}
      {
        notes.length === 0 ? (

          <div className="text-center mt-20">

            <h2 className="text-3xl font-bold mb-4">
              No Notes Found
            </h2>

            <p className="text-gray-300">
              Start adding your notes.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {
              notes.map((note) => (

                <div
                  key={note._id}
                  className="bg-white/10 rounded-3xl p-6 backdrop-blur-lg shadow-xl hover:scale-105 transition"
                >

                  <h2 className="text-2xl font-bold mb-3">
                    {note.title}
                  </h2>

                  <p className="text-gray-300 mb-6">
                    {note.content}
                  </p>


                  <div className="flex gap-3">

                    <button
                      onClick={() => editNote(note)}
                      className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-xl flex items-center gap-2"
                    >
                      <FaEdit />
                      Edit
                    </button>


                    <button
                      onClick={() => deleteNote(note._id)}
                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl flex items-center gap-2"
                    >
                      <FaTrash />
                      Delete
                    </button>

                  </div>

                </div>
              ))
            }

          </div>
        )
      }

    </div>
  )
}

export default App