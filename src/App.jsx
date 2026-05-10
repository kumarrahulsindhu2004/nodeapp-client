// import { useEffect, useState } from 'react'

// import axios from 'axios'

// import {
//   FaTrash,
//   FaEdit,
//   FaPlus,
//   FaStickyNote
// } from 'react-icons/fa'


// const API = 'http://localhost:5000/notes'
// // const API = 'https://noteapp-backend-sqal.onrender.com/notes'


// function App() {

//   const [notes, setNotes] = useState([])

//   const [title, setTitle] = useState('')

//   const [content, setContent] = useState('')


//   // Unique User ID
//   let userId = localStorage.getItem('userId')

//   if (!userId) {
//     userId = Date.now().toString()

//     localStorage.setItem('userId', userId)
//   }


//   // Fetch Notes
//   const fetchNotes = async () => {

//     try {

//       const res = await axios.get(
//         `${API}?userId=${userId}`
//       )

//       setNotes(res.data)

//     } catch (error) {

//       console.log(error)
//     }
//   }


//   useEffect(() => {
//     fetchNotes()
//   }, [])


//   // Add Note
//   const addNote = async () => {

//     if (!title || !content) {
//       alert('Please fill all fields')
//       return
//     }


//     try {

//       await axios.post(API, {
//         userId,
//         title,
//         content
//       })

//       setTitle('')
//       setContent('')

//       fetchNotes()

//     } catch (error) {

//       console.log(error)
//     }
//   }


//   // Delete Note
//   const deleteNote = async (id) => {

//     try {

//       await axios.delete(`${API}/${id}`)

//       fetchNotes()

//     } catch (error) {

//       console.log(error)
//     }
//   }


//   // Edit Note
//   const editNote = async (note) => {

//     const newTitle = prompt(
//       'Edit Title',
//       note.title
//     )

//     const newContent = prompt(
//       'Edit Content',
//       note.content
//     )

//     if (!newTitle || !newContent) return


//     try {

//       await axios.put(`${API}/${note._id}`, {
//         title: newTitle,
//         content: newContent
//       })

//       fetchNotes()

//     } catch (error) {

//       console.log(error)
//     }
//   }


//   return (

//     <div className="min-h-screen bg-slate-950 text-white p-6">

//       {/* Navbar */}
//       <div className="flex items-center gap-3 mb-10">

//         <FaStickyNote className="text-4xl text-cyan-400" />

//         <h1 className="text-4xl font-bold">
//           Notes App
//         </h1>

//       </div>


//       {/* Add Note Form */}
//       <div className="bg-white/10 p-6 rounded-3xl mb-10 backdrop-blur-lg">

//         <input
//           type="text"
//           placeholder="Enter title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full p-4 rounded-xl bg-white/20 outline-none mb-4"
//         />


//         <textarea
//           placeholder="Write note..."
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           className="w-full p-4 rounded-xl bg-white/20 outline-none mb-4 min-h-[120px]"
//         />


//         <button
//           onClick={addNote}
//           className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl flex items-center gap-2"
//         >
//           <FaPlus />
//           Add Note
//         </button>

//       </div>


//       {/* Notes */}
//       {
//         notes.length === 0 ? (

//           <div className="text-center mt-20">

//             <h2 className="text-3xl font-bold mb-4">
//               No Notes Found
//             </h2>

//             <p className="text-gray-300">
//               Start adding your notes.
//             </p>

//           </div>

//         ) : (

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

//             {
//               notes.map((note) => (

//                 <div
//                   key={note._id}
//                   className="bg-white/10 rounded-3xl p-6 backdrop-blur-lg shadow-xl hover:scale-105 transition"
//                 >

//                   <h2 className="text-2xl font-bold mb-3">
//                     {note.title}
//                   </h2>

//                   <p className="text-gray-300 mb-6">
//                     {note.content}
//                   </p>


//                   <div className="flex gap-3">

//                     <button
//                       onClick={() => editNote(note)}
//                       className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-xl flex items-center gap-2"
//                     >
//                       <FaEdit />
//                       Edit
//                     </button>


//                     <button
//                       onClick={() => deleteNote(note._id)}
//                       className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl flex items-center gap-2"
//                     >
//                       <FaTrash />
//                       Delete
//                     </button>

//                   </div>

//                 </div>
//               ))
//             }

//           </div>
//         )
//       }

//     </div>
//   )
// }

// export default App













import { useEffect, useState } from 'react'

import axios from 'axios'

import {
  FaTrash,
  FaEdit,
  FaPlus,
  FaStickyNote,
  FaSearch,
  FaTimes,
  FaEye,
  FaSave
} from 'react-icons/fa'


// Backend API
const API = 'https://noteapp-backend-sqal.onrender.com/notes'
// const API = 'http://localhost:5000/notes'



function App() {

  const [notes, setNotes] = useState([])

  const [title, setTitle] = useState('')

  const [content, setContent] = useState('')

  const [selectedNote, setSelectedNote] = useState(null)

  const [search, setSearch] = useState('')


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


  // Save Edited Note
  const saveNote = async () => {

    try {

      await axios.put(
        `${API}/${selectedNote._id}`,
        {
          title: selectedNote.title,
          content: selectedNote.content
        }
      )

      fetchNotes()

      setSelectedNote(null)

    } catch (error) {

      console.log(error)
    }
  }


  // Search Filter
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(
      search.toLowerCase()
    )
  )


  return (

    <div className="min-h-screen bg-slate-950 text-white p-6">


      {/* Header */}
      <div className="flex justify-between items-center mb-10 flex-wrap gap-4">


        {/* Logo */}
        <div className="flex items-center gap-3">

          <FaStickyNote className="text-4xl text-cyan-400" />

          <h1 className="text-4xl font-bold">
            Notes App
          </h1>

        </div>


        {/* Search */}
        <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-xl">

          <FaSearch />

          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="bg-transparent outline-none"
          />

        </div>


        {/* User Name */}
        <div className="text-xl font-semibold text-cyan-400">

          Rahul

        </div>

      </div>


      {/* Add Note Form */}
      <div className="bg-white/10 p-6 rounded-3xl mb-10 backdrop-blur-lg">

        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full p-4 rounded-xl bg-white/20 outline-none mb-4"
        />


        <textarea
          placeholder="Write note..."
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
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
        filteredNotes.length === 0 ? (

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
              filteredNotes.map((note) => (

                <div
                  key={note._id}
                  className="bg-white/10 rounded-3xl p-6 backdrop-blur-lg shadow-xl hover:scale-105 transition"
                >

                  <h2 className="text-2xl font-bold mb-3">

                    {note.title}

                  </h2>

                  <p className="text-gray-300 mb-6 line-clamp-3">

                    {note.content}

                  </p>


                  <div className="flex gap-3 flex-wrap">


                    {/* Open */}
                    <button
                      onClick={() =>
                        setSelectedNote(note)
                      }
                      className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-xl flex items-center gap-2"
                    >

                      <FaEye />

                      Open

                    </button>


                    {/* Delete */}
                    <button
                      onClick={() =>
                        deleteNote(note._id)
                      }
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


      {/* Modal */}
      {
        selectedNote && (

          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">

            <div className="bg-slate-900 w-full max-w-4xl rounded-3xl p-6">


              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">

                <h2 className="text-3xl font-bold">

                  Notes App

                </h2>


                <button
                  onClick={() =>
                    setSelectedNote(null)
                  }
                  className="text-2xl"
                >

                  <FaTimes />

                </button>

              </div>


              {/* Editable Title */}
              <input
                type="text"
                value={selectedNote.title}
                onChange={(e) =>
                  setSelectedNote({
                    ...selectedNote,
                    title: e.target.value
                  })
                }
                className="w-full p-4 rounded-xl bg-white/10 outline-none mb-4 text-2xl font-bold"
              />


              {/* Editable Content */}
              <textarea
                value={selectedNote.content}
                onChange={(e) =>
                  setSelectedNote({
                    ...selectedNote,
                    content: e.target.value
                  })
                }
                className="w-full p-4 rounded-xl bg-white/10 outline-none min-h-[300px] mb-6"
              />


              {/* Save */}
              <button
                onClick={saveNote}
                className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl flex items-center gap-2"
              >

                <FaSave />

                Save Note

              </button>

            </div>

          </div>
        )
      }

    </div>
  )
}

export default App