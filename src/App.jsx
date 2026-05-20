// import { useEffect, useState } from 'react'
// import axios from 'axios'
// import {
//   FaTrash,
//   FaPlus,
//   FaStickyNote,
//   FaSearch,
//   FaTimes,
//   FaEye,
//   FaSave
// } from 'react-icons/fa'

// const API = 'http://localhost:9000/api'

// function App() {
//   const [isLogin, setIsLogin] = useState(true)
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [token, setToken] = useState(localStorage.getItem('token') || '')

//   const [notes, setNotes] = useState([])
//   const [title, setTitle] = useState('')
//   const [content, setContent] = useState('')
//   const [selectedNote, setSelectedNote] = useState(null)
//   const [search, setSearch] = useState('')

//   const registerUser = async () => {
//     try {
//       const res = await axios.post(`${API}/auth/register`, { name, email, password })
//       localStorage.setItem('token', res.data.token)
//       setToken(res.data.token)
//       fetchNotes()
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const loginUser = async () => {
//     try {
//       const res = await axios.post(`${API}/auth/login`, { email, password })
//       localStorage.setItem('token', res.data.token)
//       setToken(res.data.token)
//       fetchNotes()
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const logoutUser = () => {
//     localStorage.removeItem('token')
//     setToken('')
//     setNotes([])
//   }

//   const fetchNotes = async () => {
//     if (!token) return
//     try {
//       const res = await axios.get(`${API}/notes`, {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       setNotes(res.data)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   useEffect(() => {
//     fetchNotes()

//     const savedTitle = localStorage.getItem('draftTitle')
//     const savedContent = localStorage.getItem('draftContent')
//     if (savedTitle) setTitle(savedTitle)
//     if (savedContent) setContent(savedContent)

//     const savedModalNote = localStorage.getItem('modalNote')
//     if (savedModalNote) setSelectedNote(JSON.parse(savedModalNote))
//   }, [])

//   useEffect(() => {
//     localStorage.setItem('draftTitle', title)
//     localStorage.setItem('draftContent', content)
//   }, [title, content])

//   useEffect(() => {
//     if (!selectedNote) return
//     localStorage.setItem('modalNote', JSON.stringify(selectedNote))
//   }, [selectedNote])

//   const addNote = async () => {
//     if (!title || !content) {
//       alert('Please fill all fields')
//       return
//     }
//     try {
//       await axios.post(
//         `${API}/notes`,
//         { title, content },
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       setTitle('')
//       setContent('')
//       localStorage.removeItem('draftTitle')
//       localStorage.removeItem('draftContent')
//       fetchNotes()
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const deleteNote = async (id) => {
//     try {
//       await axios.delete(`${API}/notes/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       fetchNotes()
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const saveNote = async () => {
//     try {
//       await axios.put(
//         `${API}/notes/${selectedNote._id}`,
//         { title: selectedNote.title, content: selectedNote.content },
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       fetchNotes()
//       localStorage.removeItem('modalNote')
//       setSelectedNote(null)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const filteredNotes = notes.filter((note) =>
//     note.title.toLowerCase().includes(search.toLowerCase())
//   )

//   return (
//     <div className="min-h-screen bg-slate-950 text-white p-6">

//       {/* Header */}
//       <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
//         <div className="flex items-center gap-3">
//           <FaStickyNote className="text-4xl text-cyan-400" />
//           <h1 className="text-4xl font-bold">Notes App</h1>
//         </div>

//         {token && (
//           <div className="flex items-center gap-3">
//             <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-xl">
//               <FaSearch />
//               <input
//                 type="text"
//                 placeholder="Search notes..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="bg-transparent outline-none"
//               />
//             </div>
//             <button
//               onClick={logoutUser}
//               className="bg-red-500 hover:bg-red-600 px-4 py-3 rounded-xl text-sm"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Auth Form */}
//       {!token && (
//         <div className="max-w-md mx-auto bg-white/10 p-6 rounded-3xl mb-10">
//           <h2 className="text-3xl font-bold mb-6">
//             {isLogin ? 'Login' : 'Register'}
//           </h2>

//           {!isLogin && (
//             <input
//               type="text"
//               placeholder="Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full p-4 rounded-xl bg-white/20 outline-none mb-4"
//             />
//           )}

//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-4 rounded-xl bg-white/20 outline-none mb-4"
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-4 rounded-xl bg-white/20 outline-none mb-4"
//           />

//           <button
//             onClick={isLogin ? loginUser : registerUser}
//             className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl w-full"
//           >
//             {isLogin ? 'Login' : 'Register'}
//           </button>

//           <p
//             className="mt-4 cursor-pointer text-cyan-400"
//             onClick={() => setIsLogin(!isLogin)}
//           >
//             {isLogin ? 'Create Account' : 'Already have account?'}
//           </p>
//         </div>
//       )}

//       {/* Logged-in view */}
//       {token && (
//         <>
//           {/* Add Note Form */}
//           <div className="bg-white/10 p-6 rounded-3xl mb-10 backdrop-blur-lg">
//             <input
//               type="text"
//               placeholder="Enter title"
//               value={title}
//               autoComplete="off"
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full p-4 rounded-xl bg-white/20 outline-none mb-4"
//             />
//             <textarea
//               placeholder="Write note..."
//               value={content}
//               autoComplete="off"
//               onChange={(e) => setContent(e.target.value)}
//               className="w-full p-4 rounded-xl bg-white/20 outline-none mb-4 min-h-[120px]"
//             />
//             <button
//               onClick={addNote}
//               className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl flex items-center gap-2"
//             >
//               <FaPlus />
//               Add Note
//             </button>
//           </div>

//           {/* Notes Grid */}
//           {filteredNotes.length === 0 ? (
//             <div className="text-center mt-20">
//               <h2 className="text-3xl font-bold mb-4">No Notes Found</h2>
//               <p className="text-gray-300">Start adding your notes.</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredNotes.map((note) => (
//                 <div
//                   key={note._id}
//                   className="bg-white/10 rounded-3xl p-6 backdrop-blur-lg shadow-xl hover:scale-105 transition"
//                 >
//                   <h2 className="text-2xl font-bold mb-3">{note.title}</h2>
//                   <p className="text-gray-300 mb-6 line-clamp-3">{note.content}</p>

//                   <div className="flex gap-3 flex-wrap">
//                     <button
//                       onClick={() => setSelectedNote(note)}
//                       className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-xl flex items-center gap-2"
//                     >
//                       <FaEye />
//                       Open
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
//               ))}
//             </div>
//           )}

//           {/* Modal */}
//           {selectedNote && (
//             <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//               <div className="bg-slate-900 w-full max-w-4xl rounded-3xl p-6">

//                 {/* Modal Header */}
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-3xl font-bold">Notes App</h2>
//                   <button
//                     onClick={() => {
//                       localStorage.removeItem('modalNote')
//                       setSelectedNote(null)
//                     }}
//                     className="text-2xl"
//                   >
//                     <FaTimes />
//                   </button>
//                 </div>

//                 {/* Modal Title */}
//                 <input
//                   type="text"
//                   value={selectedNote.title}
//                   onChange={(e) =>
//                     setSelectedNote({ ...selectedNote, title: e.target.value })
//                   }
//                   className="w-full p-4 rounded-xl bg-white/10 outline-none mb-4 text-2xl font-bold"
//                 />

//                 {/* Modal Content */}
//                 <textarea
//                   value={selectedNote.content}
//                   onChange={(e) =>
//                     setSelectedNote({ ...selectedNote, content: e.target.value })
//                   }
//                   className="w-full p-4 rounded-xl bg-white/10 outline-none min-h-[300px] mb-6"
//                 />

//                 {/* Save Button */}
//                 <button
//                   onClick={saveNote}
//                   className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl flex items-center gap-2"
//                 >
//                   <FaSave />
//                   Save Note
//                 </button>
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   )
// }

// export default App










import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  FaTrash,
  FaPlus,
  FaStickyNote,
  FaSearch,
  FaTimes,
  FaEye,
  FaSave,
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle
} from 'react-icons/fa'

// const API = 'http://localhost:9000/api'
const API = 'https://noteapp-backend-sqal.onrender.com/api'

// ─── Toast Component ──────────────────────────────────────────────────────────
function Toast({ toasts, removeToast }) {
  return (
    <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3 max-w-sm w-full">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-start gap-3 px-4 py-3 rounded-2xl shadow-2xl text-white text-sm font-medium
            backdrop-blur-md border transition-all duration-300 animate-slide-in
            ${t.type === 'error'   ? 'bg-red-500/90 border-red-400/50'   : ''}
            ${t.type === 'success' ? 'bg-green-500/90 border-green-400/50' : ''}
            ${t.type === 'info'    ? 'bg-cyan-500/90 border-cyan-400/50'   : ''}
          `}
        >
          <span className="mt-0.5 shrink-0 text-base">
            {t.type === 'error'   && <FaExclamationCircle />}
            {t.type === 'success' && <FaCheckCircle />}
            {t.type === 'info'    && <FaInfoCircle />}
          </span>
          <span className="flex-1">{t.message}</span>
          <button
            onClick={() => removeToast(t.id)}
            className="shrink-0 opacity-70 hover:opacity-100 transition"
          >
            <FaTimes />
          </button>
        </div>
      ))}
    </div>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────
function App() {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedNote, setSelectedNote] = useState(null)
  const [search, setSearch] = useState('')

  // ── Toast state ──────────────────────────────────────────────────────────────
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => removeToast(id), duration)
  }

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  // Helper: extract a readable message from an axios error
  const getErrorMessage = (error) => {
    return (
      error?.response?.data?.message ||
      error?.message ||
      'Something went wrong'
    )
  }

  // ── Auth ─────────────────────────────────────────────────────────────────────
  const registerUser = async () => {
    try {
      const res = await axios.post(`${API}/auth/register`, { name, email, password })
      localStorage.setItem('token', res.data.token)
      setToken(res.data.token)
      addToast('Account created successfully!', 'success')
      fetchNotes()
    } catch (error) {
      addToast(getErrorMessage(error), 'error')
    }
  }

  const loginUser = async () => {
    try {
      const res = await axios.post(`${API}/auth/login`, { email, password })
      localStorage.setItem('token', res.data.token)
      setToken(res.data.token)
      addToast('Logged in successfully!', 'success')
      fetchNotes()
    } catch (error) {
      addToast(getErrorMessage(error), 'error')
    }
  }

  const logoutUser = () => {
    localStorage.removeItem('token')
    setToken('')
    setNotes([])
    addToast('Logged out.', 'info')
  }

  // ── Notes ─────────────────────────────────────────────────────────────────────
  const fetchNotes = async () => {
    if (!token) return
    try {
      const res = await axios.get(`${API}/notes`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setNotes(res.data)
    } catch (error) {
      addToast(getErrorMessage(error), 'error')
    }
  }

  useEffect(() => {
    fetchNotes()

    const savedTitle = localStorage.getItem('draftTitle')
    const savedContent = localStorage.getItem('draftContent')
    if (savedTitle) setTitle(savedTitle)
    if (savedContent) setContent(savedContent)

    const savedModalNote = localStorage.getItem('modalNote')
    if (savedModalNote) setSelectedNote(JSON.parse(savedModalNote))
  }, [])

  useEffect(() => {
    localStorage.setItem('draftTitle', title)
    localStorage.setItem('draftContent', content)
  }, [title, content])

  useEffect(() => {
    if (!selectedNote) return
    localStorage.setItem('modalNote', JSON.stringify(selectedNote))
  }, [selectedNote])

  const addNote = async () => {
    if (!title || !content) {
      addToast('Please fill in both title and content.', 'error')
      return
    }
    try {
      await axios.post(
        `${API}/notes`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setTitle('')
      setContent('')
      localStorage.removeItem('draftTitle')
      localStorage.removeItem('draftContent')
      addToast('Note added!', 'success')
      fetchNotes()
    } catch (error) {
      addToast(getErrorMessage(error), 'error')
    }
  }

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API}/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      addToast('Note deleted.', 'info')
      fetchNotes()
    } catch (error) {
      addToast(getErrorMessage(error), 'error')
    }
  }

  const saveNote = async () => {
    try {
      await axios.put(
        `${API}/notes/${selectedNote._id}`,
        { title: selectedNote.title, content: selectedNote.content },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      addToast('Note saved!', 'success')
      fetchNotes()
      localStorage.removeItem('modalNote')
      setSelectedNote(null)
    } catch (error) {
      addToast(getErrorMessage(error), 'error')
    }
  }

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      {/* ── Toasts ── */}
      <Toast toasts={toasts} removeToast={removeToast} />

      <div className="min-h-screen bg-slate-950 text-white p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <FaStickyNote className="text-4xl text-cyan-400" />
            <h1 className="text-4xl font-bold">Notes App</h1>
          </div>

          {token && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-xl">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent outline-none"
                />
              </div>
              <button
                onClick={logoutUser}
                className="bg-red-500 hover:bg-red-600 px-4 py-3 rounded-xl text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Auth Form */}
        {!token && (
          <div className="max-w-md mx-auto bg-white/10 p-6 rounded-3xl mb-10">
            <h2 className="text-3xl font-bold mb-6">
              {isLogin ? 'Login' : 'Register'}
            </h2>

            {!isLogin && (
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 rounded-xl bg-white/20 outline-none mb-4"
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-xl bg-white/20 outline-none mb-4"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-xl bg-white/20 outline-none mb-4"
            />

            <button
              onClick={isLogin ? loginUser : registerUser}
              className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl w-full"
            >
              {isLogin ? 'Login' : 'Register'}
            </button>

            <p
              className="mt-4 cursor-pointer text-cyan-400"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Create Account' : 'Already have account?'}
            </p>
          </div>
        )}

        {/* Logged-in view */}
        {token && (
          <>
            {/* Add Note Form */}
            <div className="bg-white/10 p-6 rounded-3xl mb-10 backdrop-blur-lg">
              <input
                type="text"
                placeholder="Enter title"
                value={title}
                autoComplete="off"
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-4 rounded-xl bg-white/20 outline-none mb-4"
              />
              <textarea
                placeholder="Write note..."
                value={content}
                autoComplete="off"
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

            {/* Notes Grid */}
            {filteredNotes.length === 0 ? (
              <div className="text-center mt-20">
                <h2 className="text-3xl font-bold mb-4">No Notes Found</h2>
                <p className="text-gray-300">Start adding your notes.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotes.map((note) => (
                  <div
                    key={note._id}
                    className="bg-white/10 rounded-3xl p-6 backdrop-blur-lg shadow-xl hover:scale-105 transition"
                  >
                    <h2 className="text-2xl font-bold mb-3">{note.title}</h2>
                    <p className="text-gray-300 mb-6 line-clamp-3">{note.content}</p>

                    <div className="flex gap-3 flex-wrap">
                      <button
                        onClick={() => setSelectedNote(note)}
                        className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-xl flex items-center gap-2"
                      >
                        <FaEye />
                        Open
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
                ))}
              </div>
            )}

            {/* Modal */}
            {selectedNote && (
              <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                <div className="bg-slate-900 w-full max-w-4xl rounded-3xl p-6">

                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">Notes App</h2>
                    <button
                      onClick={() => {
                        localStorage.removeItem('modalNote')
                        setSelectedNote(null)
                      }}
                      className="text-2xl"
                    >
                      <FaTimes />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={selectedNote.title}
                    onChange={(e) =>
                      setSelectedNote({ ...selectedNote, title: e.target.value })
                    }
                    className="w-full p-4 rounded-xl bg-white/10 outline-none mb-4 text-2xl font-bold"
                  />

                  <textarea
                    value={selectedNote.content}
                    onChange={(e) =>
                      setSelectedNote({ ...selectedNote, content: e.target.value })
                    }
                    className="w-full p-4 rounded-xl bg-white/10 outline-none min-h-[300px] mb-6"
                  />

                  <button
                    onClick={saveNote}
                    className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl flex items-center gap-2"
                  >
                    <FaSave />
                    Save Note
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Slide-in animation */}
      <style>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease forwards;
        }
      `}</style>
    </>
  )
}

export default App