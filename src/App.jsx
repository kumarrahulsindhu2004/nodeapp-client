// import { useEffect, useState } from 'react'
// import axios from 'axios'
// import {
//   FaTrash,
//   FaPlus,
//   FaStickyNote,
//   FaSearch,
//   FaTimes,
//   FaEye,
//   FaSave,
//   FaCheckCircle,
//   FaExclamationCircle,
//   FaInfoCirclea
// } from 'react-icons/fa'

// const API = 'http://localhost:9000/api'
// // const API = 'https://noteapp-backend-sqal.onrender.com/api'

// // ─── Toast Component ──────────────────────────────────────────────────────────
// function Toast({ toasts, removeToast }) {
//   return (
//     <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3 max-w-sm w-full">
//       {toasts.map((t) => (
//         <div
//           key={t.id}
//           className={`flex items-start gap-3 px-4 py-3 rounded-2xl shadow-2xl text-white text-sm font-medium
//             backdrop-blur-md border transition-all duration-300 animate-slide-in
//             ${t.type === 'error'   ? 'bg-red-500/90 border-red-400/50'   : ''}
//             ${t.type === 'success' ? 'bg-green-500/90 border-green-400/50' : ''}
//             ${t.type === 'info'    ? 'bg-cyan-500/90 border-cyan-400/50'   : ''}
//           `}
//         >
//           <span className="mt-0.5 shrink-0 text-base">
//             {t.type === 'error'   && <FaExclamationCircle />}
//             {t.type === 'success' && <FaCheckCircle />}
//             {t.type === 'info'    && <FaInfoCircle />}
//           </span>
//           <span className="flex-1">{t.message}</span>
//           <button
//             onClick={() => removeToast(t.id)}
//             className="shrink-0 opacity-70 hover:opacity-100 transition"
//           >
//             <FaTimes />
//           </button>
//         </div>
//       ))}
//     </div>
//   )
// }

// // ─── Main App ─────────────────────────────────────────────────────────────────
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

//   // ── Toast state ──────────────────────────────────────────────────────────────
//   const [toasts, setToasts] = useState([])

//   const addToast = (message, type = 'info', duration = 4000) => {
//     const id = Date.now() + Math.random()
//     setToasts((prev) => [...prev, { id, message, type }])
//     setTimeout(() => removeToast(id), duration)
//   }

//   const removeToast = (id) => {
//     setToasts((prev) => prev.filter((t) => t.id !== id))
//   }

//   // Helper: extract a readable message from an axios error
//   const getErrorMessage = (error) => {
//     return (
//       error?.response?.data?.message ||
//       error?.message ||
//       'Something went wrong'
//     )
//   }

//   // ── Auth ─────────────────────────────────────────────────────────────────────
//   const registerUser = async () => {
//     try {
//       const res = await axios.post(`${API}/auth/register`, { name, email, password })
//       localStorage.setItem('token', res.data.token)
//       setToken(res.data.token)
//       addToast('Account created successfully!', 'success')
//       fetchNotes()
//     } catch (error) {
//       addToast(getErrorMessage(error), 'error')
//     }
//   }

//   const loginUser = async () => {
//     try {
//       const res = await axios.post(`${API}/auth/login`, { email, password })
//       localStorage.setItem('token', res.data.token)
//       setToken(res.data.token)
//       addToast('Logged in successfully!', 'success')
//       fetchNotes()
//     } catch (error) {
//       addToast(getErrorMessage(error), 'error')
//     }
//   }

//   const logoutUser = () => {
//     localStorage.removeItem('token')
//     setToken('')
//     setNotes([])
//     addToast('Logged out.', 'info')
//   }

//   // ── Notes ─────────────────────────────────────────────────────────────────────
//   const fetchNotes = async () => {
//     if (!token) return
//     try {
//       const res = await axios.get(`${API}/notes`, {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       setNotes(res.data)
//     } catch (error) {
//       addToast(getErrorMessage(error), 'error')
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
//       addToast('Please fill in both title and content.', 'error')
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
//       addToast('Note added!', 'success')
//       fetchNotes()
//     } catch (error) {
//       addToast(getErrorMessage(error), 'error')
//     }
//   }

//   const deleteNote = async (id) => {
//     try {
//       await axios.delete(`${API}/notes/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       addToast('Note deleted.', 'info')
//       fetchNotes()
//     } catch (error) {
//       addToast(getErrorMessage(error), 'error')
//     }
//   }

//   const saveNote = async () => {
//     try {
//       await axios.put(
//         `${API}/notes/${selectedNote._id}`,
//         { title: selectedNote.title, content: selectedNote.content },
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       addToast('Note saved!', 'success')
//       fetchNotes()
//       localStorage.removeItem('modalNote')
//       setSelectedNote(null)
//     } catch (error) {
//       addToast(getErrorMessage(error), 'error')
//     }
//   }

//   const filteredNotes = notes.filter((note) =>
//     note.title.toLowerCase().includes(search.toLowerCase())
//   )

//   return (
//     <>
//       {/* ── Toasts ── */}
//       <Toast toasts={toasts} removeToast={removeToast} />

//       <div className="min-h-screen bg-slate-950 text-white p-6">

//         {/* Header */}
//         <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
//           <div className="flex items-center gap-3">
//             <FaStickyNote className="text-4xl text-cyan-400" />
//             <h1 className="text-4xl font-bold">Notes App</h1>
//           </div>

//           {token && (
//             <div className="flex items-center gap-3">
//               <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-xl">
//                 <FaSearch />
//                 <input
//                   type="text"
//                   placeholder="Search notes..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   className="bg-transparent outline-none"
//                 />
//               </div>
//               <button
//                 onClick={logoutUser}
//                 className="bg-red-500 hover:bg-red-600 px-4 py-3 rounded-xl text-sm"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Auth Form */}
//         {!token && (
//           <div className="max-w-md mx-auto bg-white/10 p-6 rounded-3xl mb-10">
//             <h2 className="text-3xl font-bold mb-6">
//               {isLogin ? 'Login' : 'Register'}
//             </h2>

//             {!isLogin && (
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full p-4 rounded-xl bg-white/20 outline-none mb-4"
//               />
//             )}

//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-4 rounded-xl bg-white/20 outline-none mb-4"
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-4 rounded-xl bg-white/20 outline-none mb-4"
//             />

//             <button
//               onClick={isLogin ? loginUser : registerUser}
//               className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl w-full"
//             >
//               {isLogin ? 'Login' : 'Register'}
//             </button>

//             <p
//               className="mt-4 cursor-pointer text-cyan-400"
//               onClick={() => setIsLogin(!isLogin)}
//             >
//               {isLogin ? 'Create Account' : 'Already have account?'}
//             </p>
//           </div>
//         )}

//         {/* Logged-in view */}
//         {token && (
//           <>
//             {/* Add Note Form */}
//             <div className="bg-white/10 p-6 rounded-3xl mb-10 backdrop-blur-lg">
//               <input
//                 type="text"
//                 placeholder="Enter title"
//                 value={title}
//                 autoComplete="off"
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="w-full p-4 rounded-xl bg-white/20 outline-none mb-4"
//               />
//               <textarea
//                 placeholder="Write note..."
//                 value={content}
//                 autoComplete="off"
//                 onChange={(e) => setContent(e.target.value)}
//                 className="w-full p-4 rounded-xl bg-white/20 outline-none mb-4 min-h-[120px]"
//               />
//               <button
//                 onClick={addNote}
//                 className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl flex items-center gap-2"
//               >
//                 <FaPlus />
//                 Add Note
//               </button>
//             </div>

//             {/* Notes Grid */}
//             {filteredNotes.length === 0 ? (
//               <div className="text-center mt-20">
//                 <h2 className="text-3xl font-bold mb-4">No Notes Found</h2>
//                 <p className="text-gray-300">Start adding your notes.</p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredNotes.map((note) => (
//                   <div
//                     key={note._id}
//                     className="bg-white/10 rounded-3xl p-6 backdrop-blur-lg shadow-xl hover:scale-105 transition"
//                   >
//                     <h2 className="text-2xl font-bold mb-3">{note.title}</h2>
//                     <p className="text-gray-300 mb-6 line-clamp-3">{note.content}</p>

//                     <div className="flex gap-3 flex-wrap">
//                       <button
//                         onClick={() => setSelectedNote(note)}
//                         className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-xl flex items-center gap-2"
//                       >
//                         <FaEye />
//                         Open
//                       </button>
//                       <button
//                         onClick={() => deleteNote(note._id)}
//                         className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl flex items-center gap-2"
//                       >
//                         <FaTrash />
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Modal */}
//             {selectedNote && (
//               <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//                 <div className="bg-slate-900 w-full max-w-4xl rounded-3xl p-6">

//                   <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-3xl font-bold">Notes App</h2>
//                     <button
//                       onClick={() => {
//                         localStorage.removeItem('modalNote')
//                         setSelectedNote(null)
//                       }}
//                       className="text-2xl"
//                     >
//                       <FaTimes />
//                     </button>
//                   </div>

//                   <input
//                     type="text"
//                     value={selectedNote.title}
//                     onChange={(e) =>
//                       setSelectedNote({ ...selectedNote, title: e.target.value })
//                     }
//                     className="w-full p-4 rounded-xl bg-white/10 outline-none mb-4 text-2xl font-bold"
//                   />

//                   <textarea
//                     value={selectedNote.content}
//                     onChange={(e) =>
//                       setSelectedNote({ ...selectedNote, content: e.target.value })
//                     }
//                     className="w-full p-4 rounded-xl bg-white/10 outline-none min-h-[300px] mb-6"
//                   />

//                   <button
//                     onClick={saveNote}
//                     className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl flex items-center gap-2"
//                   >
//                     <FaSave />
//                     Save Note
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Slide-in animation */}
//       <style>{`
//         @keyframes slide-in {
//           from { opacity: 0; transform: translateX(60px); }
//           to   { opacity: 1; transform: translateX(0); }
//         }
//         .animate-slide-in {
//           animation: slide-in 0.3s ease forwards;
//         }
//       `}</style>
//     </>
//   )
// }

// export default App




// import { useEffect, useState } from 'react'
// import axios from 'axios'
// import {
//   FaTrash,
//   FaPlus,
//   FaStickyNote,
//   FaSearch,
//   FaTimes,
//   FaEye,
//   FaSave,
//   FaCheckCircle,
//   FaExclamationCircle,
//   FaInfoCircle,
//   FaFolder,
//   FaFolderOpen,
//   FaEdit,
// } from 'react-icons/fa'

// const API = 'http://localhost:9000/api'
// // const API = 'https://noteapp-backend-sqal.onrender.com/api'

// // ─── Toast Component ──────────────────────────────────────────────────────────
// function Toast({ toasts, removeToast }) {
//   return (
//     <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3 max-w-sm w-full">
//       {toasts.map((t) => (
//         <div
//           key={t.id}
//           className={`flex items-start gap-3 px-4 py-3 rounded-2xl shadow-2xl text-white text-sm font-medium
//             backdrop-blur-md border transition-all duration-300 animate-slide-in
//             ${t.type === 'error'   ? 'bg-red-500/90 border-red-400/50'     : ''}
//             ${t.type === 'success' ? 'bg-green-500/90 border-green-400/50' : ''}
//             ${t.type === 'info'    ? 'bg-cyan-500/90 border-cyan-400/50'   : ''}
//           `}
//         >
//           <span className="mt-0.5 shrink-0 text-base">
//             {t.type === 'error'   && <FaExclamationCircle />}
//             {t.type === 'success' && <FaCheckCircle />}
//             {t.type === 'info'    && <FaInfoCircle />}
//           </span>
//           <span className="flex-1">{t.message}</span>
//           <button
//             onClick={() => removeToast(t.id)}
//             className="shrink-0 opacity-70 hover:opacity-100 transition"
//           >
//             <FaTimes />
//           </button>
//         </div>
//       ))}
//     </div>
//   )
// }

// // ─── Section Create/Edit Modal ────────────────────────────────────────────────
// function SectionModal({ onClose, onSave, initial }) {
//   const [title, setTitle] = useState(initial?.title || '')
//   const [desc, setDesc]   = useState(initial?.description || '')

//   return (
//     <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//       <div className="bg-slate-900 w-full max-w-md rounded-3xl p-6 border border-white/10">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-white">
//             {initial ? 'Edit Section' : 'New Section'}
//           </h2>
//           <button onClick={onClose} className="text-xl text-gray-400 hover:text-white transition">
//             <FaTimes />
//           </button>
//         </div>

//         <input
//           type="text"
//           placeholder="Section title *"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full p-4 rounded-xl bg-white/10 outline-none mb-4 text-lg font-semibold placeholder-gray-500 text-white"
//         />
//         <textarea
//           placeholder="Description (optional)"
//           value={desc}
//           onChange={(e) => setDesc(e.target.value)}
//           className="w-full p-4 rounded-xl bg-white/10 outline-none mb-6 min-h-[100px] placeholder-gray-500 resize-none text-white"
//         />

//         <div className="flex gap-3">
//           <button
//             onClick={() => onSave(title, desc)}
//             className="flex-1 bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-xl font-semibold transition text-white"
//           >
//             {initial ? 'Save Changes' : 'Create Section'}
//           </button>
//           <button
//             onClick={onClose}
//             className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition text-white"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// // ─── Note View/Edit Modal ─────────────────────────────────────────────────────
// function NoteModal({ note, onClose, onSave }) {
//   const [editNote, setEditNote] = useState(note)

//   return (
//     <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//       <div className="bg-slate-900 w-full max-w-4xl rounded-3xl p-6 border border-white/10">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
//             <FaStickyNote className="text-cyan-400" />
//             Edit Note
//           </h2>
//           <button onClick={onClose} className="text-xl text-gray-400 hover:text-white transition">
//             <FaTimes />
//           </button>
//         </div>

//         <input
//           type="text"
//           value={editNote.title}
//           onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}
//           className="w-full p-4 rounded-xl bg-white/10 outline-none mb-4 text-2xl font-bold text-white"
//         />
//         <textarea
//           value={editNote.content}
//           onChange={(e) => setEditNote({ ...editNote, content: e.target.value })}
//           className="w-full p-4 rounded-xl bg-white/10 outline-none min-h-[300px] mb-6 resize-none text-white"
//         />

//         <button
//           onClick={() => onSave(editNote)}
//           className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition text-white"
//         >
//           <FaSave />
//           Save Note
//         </button>
//       </div>
//     </div>
//   )
// }

// // ─── Main App ─────────────────────────────────────────────────────────────────
// function App() {
//   // Auth
//   const [isLogin, setIsLogin]   = useState(true)
//   const [name, setName]         = useState('')
//   const [email, setEmail]       = useState('')
//   const [password, setPassword] = useState('')
//   const [token, setToken]       = useState(localStorage.getItem('token') || '')

//   // Notes
//   const [notes, setNotes]             = useState([])
//   const [title, setTitle]             = useState('')
//   const [content, setContent]         = useState('')
//   const [selectedNote, setSelectedNote] = useState(null)
//   const [search, setSearch]           = useState('')

//   // Sections
//   const [sections, setSections]             = useState([])
//   const [activeSection, setActiveSection]   = useState(null)   // null = standalone notes
//   const [showSectionModal, setShowSectionModal] = useState(false)
//   const [editingSection, setEditingSection] = useState(null)

//   // Toast
//   const [toasts, setToasts] = useState([])

//   const addToast = (message, type = 'info', duration = 4000) => {
//     const id = Date.now() + Math.random()
//     setToasts((prev) => [...prev, { id, message, type }])
//     setTimeout(() => removeToast(id), duration)
//   }

//   const removeToast = (id) => {
//     setToasts((prev) => prev.filter((t) => t.id !== id))
//   }

//   const getErrorMessage = (error) =>
//     error?.response?.data?.message || error?.message || 'Something went wrong'

//   const authHeaders = { Authorization: `Bearer ${token}` }

//   // ── Auth ──────────────────────────────────────────────────────────────────────
//   const registerUser = async () => {
//     try {
//       const res = await axios.post(`${API}/auth/register`, { name, email, password })
//       localStorage.setItem('token', res.data.token)
//       setToken(res.data.token)
//       addToast('Account created successfully!', 'success')
//     } catch (error) {
//       addToast(getErrorMessage(error), 'error')
//     }
//   }

//   const loginUser = async () => {
//     try {
//       const res = await axios.post(`${API}/auth/login`, { email, password })
//       localStorage.setItem('token', res.data.token)
//       setToken(res.data.token)
//       addToast('Logged in successfully!', 'success')
//     } catch (error) {
//       addToast(getErrorMessage(error), 'error')
//     }
//   }

//   const logoutUser = () => {
//     localStorage.removeItem('token')
//     localStorage.removeItem('draftTitle')
//     localStorage.removeItem('draftContent')
//     localStorage.removeItem('modalNote')
//     setToken('')
//     setNotes([])
//     setSections([])
//     setActiveSection(null)
//     addToast('Logged out.', 'info')
//   }

//   // ── Sections ──────────────────────────────────────────────────────────────────
//   const fetchSections = async () => {
//     if (!token) return
//     try {
//       const res = await axios.get(`${API}/sections`, { headers: authHeaders })
//       setSections(res.data)
//     } catch (error) {
//       addToast(getErrorMessage(error), 'error')
//     }
//   }

//   const handleCreateSection = async (title, description) => {
//     if (!title.trim()) { addToast('Section title is required', 'error'); return }
//     try {
//       await axios.post(`${API}/sections`, { title, description }, { headers: authHeaders })
//       setShowSectionModal(false)
//       addToast('Section created!', 'success')
//       fetchSections()
//     } catch (error) {
//       addToast(getErrorMessage(error), 'error')
//     }
//   }

//   const handleUpdateSection = async (title, description) => {
//     if (!title.trim()) { addToast('Section title is required', 'error'); return }
//     try {
//       await axios.put(
//         `${API}/sections/${editingSection._id}`,
//         { title, description },
//         { headers: authHeaders }
//       )
//       setEditingSection(null)
//       addToast('Section updated!', 'success')
//       fetchSections()
//     } catch (error) {
//       addToast(getErrorMessage(error), 'error')
//     }
//   }

//   const deleteSection = async (id) => {
//     try {
//       await axios.delete(`${API}/sections/${id}`, { headers: authHeaders })
//       if (activeSection === id) setActiveSection(null)
//       addToast('Section deleted.', 'info')
//       fetchSections()
//     } catch (error) {
//       addToast(getErrorMessage(error), 'error')
//     }
//   }

//   // ── Notes ─────────────────────────────────────────────────────────────────────
//   const fetchNotes = async (sectionId = activeSection) => {
//     if (!token) return
//     try {
//       let url = `${API}/notes`
//       if (sectionId) {
//         url += `?section=${sectionId}`
//       } else {
//         url += `?standalone=true`
//       }
//       const res = await axios.get(url, { headers: authHeaders })
//       setNotes(res.data)
//     } catch (error) {
//       addToast(getErrorMessage(error), 'error')
//     }
//   }

//   useEffect(() => {
//     if (token) {
//       fetchNotes(activeSection)
//       fetchSections()
//     }
//   }, [token, activeSection])

//   useEffect(() => {
//     const savedTitle   = localStorage.getItem('draftTitle')
//     const savedContent = localStorage.getItem('draftContent')
//     if (savedTitle)   setTitle(savedTitle)
//     if (savedContent) setContent(savedContent)

//     const savedModalNote = localStorage.getItem('modalNote')
//     if (savedModalNote) setSelectedNote(JSON.parse(savedModalNote))
//   }, [])

//   useEffect(() => {
//     localStorage.setItem('draftTitle',   title)
//     localStorage.setItem('draftContent', content)
//   }, [title, content])

//   useEffect(() => {
//     if (!selectedNote) return
//     localStorage.setItem('modalNote', JSON.stringify(selectedNote))
//   }, [selectedNote])

//   const addNote = async () => {
//     if (!title || !content) {
//       addToast('Please fill in both title and content.', 'error')
//       return
//     }
//     try {
//       await axios.post(
//         `${API}/notes`,
//         { title, content, sectionId: activeSection },
//         { headers: authHeaders }
//       )
//       setTitle('')
//       setContent('')
//       localStorage.removeItem('draftTitle')
//       localStorage.removeItem('draftContent')
//       addToast('Note added!', 'success')
//       fetchNotes(activeSection)
//     } catch (error) {
//       addToast(getErrorMessage(error), 'error')
//     }
//   }

//   const deleteNote = async (id) => {
//     try {
//       await axios.delete(`${API}/notes/${id}`, { headers: authHeaders })
//       addToast('Note deleted.', 'info')
//       fetchNotes(activeSection)
//     } catch (error) {
//       addToast(getErrorMessage(error), 'error')
//     }
//   }

//   const saveNote = async (editedNote) => {
//     try {
//       await axios.put(
//         `${API}/notes/${editedNote._id}`,
//         { title: editedNote.title, content: editedNote.content },
//         { headers: authHeaders }
//       )
//       addToast('Note saved!', 'success')
//       fetchNotes(activeSection)
//       localStorage.removeItem('modalNote')
//       setSelectedNote(null)
//     } catch (error) {
//       addToast(getErrorMessage(error), 'error')
//     }
//   }

//   const filteredNotes = notes.filter((note) =>
//     note.title.toLowerCase().includes(search.toLowerCase())
//   )

//   // ── Active section info ───────────────────────────────────────────────────────
//   const activeSectionData = sections.find((s) => s._id === activeSection)

//   return (
//     <>
//       <Toast toasts={toasts} removeToast={removeToast} />

//       {/* Section Create Modal */}
//       {showSectionModal && (
//         <SectionModal
//           onClose={() => setShowSectionModal(false)}
//           onSave={handleCreateSection}
//         />
//       )}

//       {/* Section Edit Modal */}
//       {editingSection && (
//         <SectionModal
//           initial={editingSection}
//           onClose={() => setEditingSection(null)}
//           onSave={handleUpdateSection}
//         />
//       )}

//       {/* Note View/Edit Modal */}
//       {selectedNote && (
//         <NoteModal
//           note={selectedNote}
//           onClose={() => {
//             localStorage.removeItem('modalNote')
//             setSelectedNote(null)
//           }}
//           onSave={(editedNote) => saveNote(editedNote)}
//         />
//       )}

//       <div className="min-h-screen bg-slate-950 text-white p-6">

//         {/* ── Header ── */}
//         <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
//           <div className="flex items-center gap-3">
//             <FaStickyNote className="text-4xl text-cyan-400" />
//             <h1 className="text-4xl font-bold">Notes App</h1>
//           </div>

//           {token && (
//             <div className="flex items-center gap-3 flex-wrap">
//               <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-xl">
//                 <FaSearch className="text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search notes..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   className="bg-transparent outline-none w-40"
//                 />
//               </div>
//               <button
//                 onClick={logoutUser}
//                 className="bg-red-500 hover:bg-red-600 px-4 py-3 rounded-xl text-sm font-semibold transition"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>

//         {/* ── Auth Form ── */}
//         {!token && (
//           <div className="max-w-md mx-auto bg-white/10 p-6 rounded-3xl mb-10">
//             <h2 className="text-3xl font-bold mb-6">
//               {isLogin ? 'Login' : 'Register'}
//             </h2>

//             {!isLogin && (
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full p-4 rounded-xl bg-white/20 outline-none mb-4"
//               />
//             )}
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-4 rounded-xl bg-white/20 outline-none mb-4"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-4 rounded-xl bg-white/20 outline-none mb-4"
//             />
//             <button
//               onClick={isLogin ? loginUser : registerUser}
//               className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl w-full font-semibold transition"
//             >
//               {isLogin ? 'Login' : 'Register'}
//             </button>
//             <p
//               className="mt-4 cursor-pointer text-cyan-400 hover:text-cyan-300 transition"
//               onClick={() => setIsLogin(!isLogin)}
//             >
//               {isLogin ? 'Create Account' : 'Already have account?'}
//             </p>
//           </div>
//         )}

//         {/* ── Logged-in view ── */}
//         {token && (
//           <>
//             {/* ── Sections Tabs ── */}
//             <div className="mb-6">
//               <div className="flex gap-2 flex-wrap items-center">
//                 {/* All Notes Tab */}
//                 <button
//                   onClick={() => setActiveSection(null)}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition
//                     ${activeSection === null
//                       ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
//                       : 'bg-white/10 hover:bg-white/20 text-gray-300'}`}
//                 >
//                   <FaStickyNote />
//                   My Notes
//                 </button>

//                 {/* Section Tabs */}
//                 {sections.map((sec) => (
//                   <div key={sec._id} className="flex items-center gap-1 group">
//                     <button
//                       onClick={() => setActiveSection(sec._id)}
//                       className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition
//                         ${activeSection === sec._id
//                           ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
//                           : 'bg-white/10 hover:bg-white/20 text-gray-300'}`}
//                     >
//                       {activeSection === sec._id ? <FaFolderOpen /> : <FaFolder />}
//                       {sec.title}
//                     </button>

//                     {/* Section action buttons — show on hover */}
//                     <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
//                       <button
//                         onClick={() => setEditingSection(sec)}
//                         title="Edit section"
//                         className="text-gray-400 hover:text-purple-400 text-xs px-1 transition"
//                       >
//                         <FaEdit />
//                       </button>
//                       <button
//                         onClick={() => deleteSection(sec._id)}
//                         title="Delete section"
//                         className="text-gray-400 hover:text-red-400 text-xs px-1 transition"
//                       >
//                         <FaTrash />
//                       </button>
//                     </div>
//                   </div>
//                 ))}

//                 {/* Add Section Button */}
//                 <button
//                   onClick={() => setShowSectionModal(true)}
//                   className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
//                     bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 border border-purple-500/30
//                     hover:border-purple-500/60 transition"
//                 >
//                   <FaPlus />
//                   Add Section
//                 </button>
//               </div>

//               {/* Active Section Description */}
//               {activeSectionData?.description && (
//                 <p className="mt-3 text-sm text-gray-400 pl-1">
//                   {activeSectionData.description}
//                 </p>
//               )}
//             </div>

//             {/* ── Add Note Form ── */}
//             <div className="bg-white/10 p-6 rounded-3xl mb-10 backdrop-blur-lg border border-white/5">
//               {/* Section badge on form */}
//               {activeSectionData && (
//                 <div className="mb-4 flex items-center gap-2 text-sm text-purple-300">
//                   <FaFolder />
//                   <span>Adding to: <strong>{activeSectionData.title}</strong></span>
//                 </div>
//               )}

//               <input
//                 type="text"
//                 placeholder="Enter title"
//                 value={title}
//                 autoComplete="off"
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="w-full p-4 rounded-xl bg-white/10 outline-none mb-4 placeholder-gray-500"
//               />
//               <textarea
//                 placeholder="Write note..."
//                 value={content}
//                 autoComplete="off"
//                 onChange={(e) => setContent(e.target.value)}
//                 className="w-full p-4 rounded-xl bg-white/10 outline-none mb-4 min-h-[120px] resize-none placeholder-gray-500"
//               />

//               <div className="flex gap-3 flex-wrap">
//                 <button
//                   onClick={addNote}
//                   className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition shadow-lg shadow-cyan-500/20"
//                 >
//                   <FaPlus />
//                   Add Note
//                 </button>
//                 <button
//                   onClick={() => setShowSectionModal(true)}
//                   className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition shadow-lg shadow-purple-500/20"
//                 >
//                   <FaPlus />
//                   Add Section
//                 </button>
//               </div>
//             </div>

//             {/* ── Notes Grid ── */}
//             {filteredNotes.length === 0 ? (
//               <div className="text-center mt-20">
//                 <FaStickyNote className="text-6xl text-gray-700 mx-auto mb-4" />
//                 <h2 className="text-3xl font-bold mb-4 text-gray-400">No Notes Found</h2>
//                 <p className="text-gray-500">
//                   {activeSection
//                     ? `No notes in "${activeSectionData?.title}" section yet.`
//                     : 'Start adding your notes above.'}
//                 </p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredNotes.map((note) => (
//                   <div
//                     key={note._id}
//                     className="bg-white/10 rounded-3xl p-6 backdrop-blur-lg shadow-xl hover:scale-[1.02] transition border border-white/5 hover:border-white/10"
//                   >
//                     <h2 className="text-xl font-bold mb-3 line-clamp-1">{note.title}</h2>
//                     <p className="text-gray-400 mb-6 line-clamp-3 text-sm leading-relaxed">{note.content}</p>

//                     <div className="flex gap-3 flex-wrap">
//                       <button
//                         onClick={() => setSelectedNote(note)}
//                         className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-semibold transition"
//                       >
//                         <FaEye />
//                         Open
//                       </button>
//                       <button
//                         onClick={() => deleteNote(note._id)}
//                         className="bg-red-500/80 hover:bg-red-500 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-semibold transition"
//                       >
//                         <FaTrash />
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* ── Animations ── */}
//       <style>{`
//         @keyframes slide-in {
//           from { opacity: 0; transform: translateX(60px); }
//           to   { opacity: 1; transform: translateX(0); }
//         }
//         .animate-slide-in {
//           animation: slide-in 0.3s ease forwards;
//         }
//       `}</style>
//     </>
//   )
// }

// export default App




import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  FaTrash, FaPlus, FaStickyNote, FaSearch, FaTimes, FaEye,
  FaSave, FaCheckCircle, FaExclamationCircle, FaInfoCircle,
  FaFolder, FaFolderOpen, FaEdit, FaUsers, FaChartBar,
  FaShieldAlt, FaSignOutAlt, FaNotesMedical, FaUserCircle,
} from 'react-icons/fa'

// const API = 'http://localhost:9000/api'
const API = 'https://noteapp-backend-sqal.onrender.com/api'

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ toasts, removeToast }) {
  return (
    <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3 max-w-sm w-full">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-start gap-3 px-4 py-3 rounded-2xl shadow-2xl text-white text-sm font-medium
            backdrop-blur-md border transition-all duration-300 animate-slide-in
            ${t.type === 'error'   ? 'bg-red-500/90 border-red-400/50'     : ''}
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
          <button onClick={() => removeToast(t.id)} className="shrink-0 opacity-70 hover:opacity-100 transition">
            <FaTimes />
          </button>
        </div>
      ))}
    </div>
  )
}

// ─── Section Modal ─────────────────────────────────────────────────────────────
function SectionModal({ onClose, onSave, initial }) {
  const [title, setTitle] = useState(initial?.title || '')
  const [desc, setDesc]   = useState(initial?.description || '')
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 w-full max-w-md rounded-3xl p-6 border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{initial ? 'Edit Section' : 'New Section'}</h2>
          <button onClick={onClose} className="text-xl text-gray-400 hover:text-white transition"><FaTimes /></button>
        </div>
        <input
          type="text" placeholder="Section title *" value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 rounded-xl bg-white/10 outline-none mb-4 text-lg font-semibold placeholder-gray-500 text-white"
        />
        <textarea
          placeholder="Description (optional)" value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full p-4 rounded-xl bg-white/10 outline-none mb-6 min-h-[100px] placeholder-gray-500 resize-none text-white"
        />
        <div className="flex gap-3">
          <button onClick={() => onSave(title, desc)}
            className="flex-1 bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-xl font-semibold transition text-white">
            {initial ? 'Save Changes' : 'Create Section'}
          </button>
          <button onClick={onClose} className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition text-white">Cancel</button>
        </div>
      </div>
    </div>
  )
}

// ─── Note Modal ────────────────────────────────────────────────────────────────
function NoteModal({ note, onClose, onSave }) {
  const [editNote, setEditNote] = useState(note)
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 w-full max-w-4xl rounded-3xl p-6 border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
            <FaStickyNote className="text-cyan-400" /> Edit Note
          </h2>
          <button onClick={onClose} className="text-xl text-gray-400 hover:text-white transition"><FaTimes /></button>
        </div>
        <input
          type="text" value={editNote.title}
          onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}
          className="w-full p-4 rounded-xl bg-white/10 outline-none mb-4 text-2xl font-bold text-white"
        />
        <textarea
          value={editNote.content}
          onChange={(e) => setEditNote({ ...editNote, content: e.target.value })}
          className="w-full p-4 rounded-xl bg-white/10 outline-none min-h-[300px] mb-6 resize-none text-white"
        />
        <button onClick={() => onSave(editNote)}
          className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition text-white">
          <FaSave /> Save Note
        </button>
      </div>
    </div>
  )
}

// ─── Admin: Stat Card ──────────────────────────────────────────────────────────
function StatCard({ icon, label, value, color }) {
  return (
    <div className={`bg-slate-800/60 border border-white/5 rounded-2xl p-6 flex items-center gap-5`}>
      <div className={`text-3xl ${color}`}>{icon}</div>
      <div>
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-3xl font-bold text-white">{value ?? '—'}</p>
      </div>
    </div>
  )
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
function AdminDashboard({ token, addToast, onLogout, currentUser }) {
  const [tab, setTab]               = useState('dashboard')  // dashboard | users
  const [stats, setStats]           = useState(null)
  const [users, setUsers]           = useState([])
  const [viewingUser, setViewingUser] = useState(null)
  const [userNotes, setUserNotes]   = useState([])
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [search, setSearch]         = useState('')

  const h = { Authorization: `Bearer ${token}` }

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API}/admin/stats`, { headers: h })
      setStats(res.data)
    } catch (e) {
      addToast(e?.response?.data?.message || 'Failed to load stats', 'error')
    }
  }

  const fetchUsers = async () => {
    setLoadingUsers(true)
    try {
      const res = await axios.get(`${API}/admin/users`, { headers: h })
      setUsers(res.data)
    } catch (e) {
      addToast(e?.response?.data?.message || 'Failed to load users', 'error')
    } finally {
      setLoadingUsers(false)
    }
  }

  const fetchUserNotes = async (userId) => {
    try {
      const res = await axios.get(`${API}/admin/users/${userId}/notes`, { headers: h })
      setUserNotes(res.data)
    } catch (e) {
      addToast('Failed to load notes', 'error')
    }
  }

  const deleteUser = async (userId) => {
    if (!window.confirm('Delete this user and ALL their notes? This cannot be undone.')) return
    try {
      await axios.delete(`${API}/admin/users/${userId}`, { headers: h })
      addToast('User deleted.', 'info')
      setViewingUser(null)
      fetchUsers()
      fetchStats()
    } catch (e) {
      addToast(e?.response?.data?.message || 'Delete failed', 'error')
    }
  }

  const deleteNote = async (noteId) => {
    try {
      await axios.delete(`${API}/admin/notes/${noteId}`, { headers: h })
      addToast('Note deleted.', 'info')
      setUserNotes((prev) => prev.filter((n) => n._id !== noteId))
      fetchStats()
    } catch (e) {
      addToast('Failed to delete note', 'error')
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  useEffect(() => {
    if (tab === 'users') fetchUsers()
  }, [tab])

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  )

  const sidebarLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaChartBar /> },
    { id: 'users',     label: 'Users',     icon: <FaUsers /> },
  ]

  return (
    <div className="min-h-screen bg-slate-950 flex">

      {/* ── Sidebar ── */}
      <aside className="w-64 bg-slate-900 border-r border-white/5 flex flex-col p-4 shrink-0">
        {/* Brand */}
        <div className="flex items-center gap-3 px-3 py-4 mb-6">
          <FaShieldAlt className="text-2xl text-purple-400" />
          <div>
            <p className="font-bold text-white text-lg leading-tight">Admin Panel</p>
            <p className="text-xs text-gray-500">Notes App</p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 flex-1">
          {sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { setTab(link.id); setViewingUser(null) }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition text-left
                ${tab === link.id
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              {link.icon}
              {link.label}
            </button>
          ))}
        </nav>

        {/* Current admin info + logout */}
        <div className="border-t border-white/5 pt-4 mt-4">
          <div className="flex items-center gap-3 px-3 mb-3">
            <FaUserCircle className="text-2xl text-purple-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{currentUser?.name}</p>
              <p className="text-xs text-gray-500 truncate">{currentUser?.email}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 w-full px-4 py-2 rounded-xl text-sm font-semibold
              text-red-400 hover:bg-red-500/10 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 overflow-auto p-8">

        {/* ════ DASHBOARD TAB ════ */}
        {tab === 'dashboard' && (
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400 mb-8">Overview of all activity in your app.</p>

            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              <StatCard icon={<FaUsers />}        label="Total Users" value={stats?.totalUsers} color="text-cyan-400" />
              <StatCard icon={<FaNotesMedical />} label="Total Notes" value={stats?.totalNotes} color="text-purple-400" />
              <StatCard icon={<FaShieldAlt />}    label="Admin Role"  value="Active"            color="text-green-400" />
            </div>

            {/* Recent signups */}
            <div className="bg-slate-900 rounded-2xl border border-white/5 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/5">
                <h2 className="text-lg font-bold text-white">Recent Signups</h2>
                <p className="text-xs text-gray-500 mt-0.5">Last 5 registered users</p>
              </div>
              <div className="divide-y divide-white/5">
                {stats?.recentUsers?.length === 0 && (
                  <p className="text-gray-500 text-sm px-6 py-6">No users yet.</p>
                )}
                {stats?.recentUsers?.map((u) => (
                  <div key={u._id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/3 transition">
                    <div className="w-9 h-9 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 font-bold shrink-0">
                      {u.name[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold truncate">{u.name}</p>
                      <p className="text-gray-500 text-xs truncate">{u.email}</p>
                    </div>
                    <span className="text-xs text-gray-500 shrink-0">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════ USERS TAB ════ */}
        {tab === 'users' && !viewingUser && (
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">All Users</h1>
            <p className="text-gray-400 mb-6">View, search, and manage all registered users.</p>

            {/* Search */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-xl mb-6 max-w-sm">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-sm text-white placeholder-gray-500 w-full"
              />
            </div>

            {/* Users table */}
            <div className="bg-slate-900 rounded-2xl border border-white/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-gray-500 text-xs uppercase tracking-wider">
                      <th className="text-left px-6 py-4">User</th>
                      <th className="text-left px-6 py-4">Email</th>
                      <th className="text-left px-6 py-4">Role</th>
                      <th className="text-left px-6 py-4">Notes</th>
                      <th className="text-left px-6 py-4">Joined</th>
                      <th className="text-left px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {loadingUsers && (
                      <tr><td colSpan={6} className="text-center py-10 text-gray-500">Loading...</td></tr>
                    )}
                    {!loadingUsers && filteredUsers.length === 0 && (
                      <tr><td colSpan={6} className="text-center py-10 text-gray-500">No users found.</td></tr>
                    )}
                    {filteredUsers.map((u) => (
                      <tr key={u._id} className="hover:bg-white/3 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 font-bold text-xs shrink-0">
                              {u.name[0].toUpperCase()}
                            </div>
                            <span className="text-white font-semibold">{u.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-400">{u.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-lg text-xs font-semibold
                            ${u.role === 'admin'
                              ? 'bg-purple-500/20 text-purple-300'
                              : 'bg-white/10 text-gray-400'}`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-400">{u.noteCount}</td>
                        <td className="px-6 py-4 text-gray-500 text-xs">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => { setViewingUser(u); fetchUserNotes(u._id) }}
                              className="flex items-center gap-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                            >
                              <FaEye /> Notes
                            </button>
                            <button
                              onClick={() => deleteUser(u._id)}
                              className="flex items-center gap-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                            >
                              <FaTrash /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ════ USER NOTES VIEW ════ */}
        {tab === 'users' && viewingUser && (
          <div>
            {/* Back button + user info */}
            <button
              onClick={() => { setViewingUser(null); setUserNotes([]) }}
              className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition"
            >
              ← Back to Users
            </button>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 font-bold text-2xl">
                {viewingUser.name[0].toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{viewingUser.name}</h1>
                <p className="text-gray-400 text-sm">{viewingUser.email} · {userNotes.length} notes</p>
              </div>
              <button
                onClick={() => deleteUser(viewingUser._id)}
                className="ml-auto flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-xl text-sm font-semibold transition"
              >
                <FaTrash /> Delete User
              </button>
            </div>

            {/* Notes list */}
            {userNotes.length === 0 ? (
              <div className="text-center mt-20">
                <FaStickyNote className="text-5xl text-gray-700 mx-auto mb-4" />
                <p className="text-gray-500">This user has no notes.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {userNotes.map((note) => (
                  <div key={note._id}
                    className="bg-slate-900 rounded-2xl p-5 border border-white/5 hover:border-white/10 transition">
                    <h3 className="text-white font-bold mb-2 line-clamp-1">{note.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">{note.content}</p>
                    {/* ADD THIS */}
<p className="text-xs text-gray-600 mb-3">
  {note.updatedAt && note.updatedAt !== note.createdAt
    ? `Updated ${new Date(note.updatedAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}`
    : `Created ${new Date(note.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}`
  }
</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => deleteNote(note._id)}
                        className="flex items-center gap-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────
function App() {
  // Auth
  const [isLogin, setIsLogin]   = useState(true)
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken]       = useState(localStorage.getItem('token') || '')
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('currentUser') || 'null')
  )

  // Notes
  const [notes, setNotes]               = useState([])
  const [title, setTitle]               = useState('')
  const [content, setContent]           = useState('')
  const [selectedNote, setSelectedNote] = useState(null)
  const [search, setSearch]             = useState('')

  // Sections
  const [sections, setSections]                 = useState([])
  const [activeSection, setActiveSection]       = useState(null)
  const [showSectionModal, setShowSectionModal] = useState(false)
  const [editingSection, setEditingSection]     = useState(null)

  // Toast
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => removeToast(id), duration)
  }
  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id))
  const getError    = (e)  => e?.response?.data?.message || e?.message || 'Something went wrong'

  const authHeaders = { Authorization: `Bearer ${token}` }

  // ── Auth ───────────────────────────────────────────────────────────────────
  const registerUser = async () => {
    try {
      const res = await axios.post(`${API}/auth/register`, { name, email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('currentUser', JSON.stringify(res.data.user))
      setToken(res.data.token)
      setCurrentUser(res.data.user)
      addToast('Account created successfully!', 'success')
    } catch (e) { addToast(getError(e), 'error') }
  }

  const loginUser = async () => {
    try {
      const res = await axios.post(`${API}/auth/login`, { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('currentUser', JSON.stringify(res.data.user))
      setToken(res.data.token)
      setCurrentUser(res.data.user)
      addToast('Logged in successfully!', 'success')
    } catch (e) { addToast(getError(e), 'error') }
  }

  const logoutUser = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('draftTitle')
    localStorage.removeItem('draftContent')
    localStorage.removeItem('modalNote')
    setToken('')
    setCurrentUser(null)
    setNotes([])
    setSections([])
    setActiveSection(null)
    addToast('Logged out.', 'info')
  }

  // ── Sections ───────────────────────────────────────────────────────────────
  const fetchSections = async () => {
    if (!token) return
    try {
      const res = await axios.get(`${API}/sections`, { headers: authHeaders })
      setSections(res.data)
    } catch (e) { addToast(getError(e), 'error') }
  }

  const handleCreateSection = async (sTitle, desc) => {
    if (!sTitle.trim()) { addToast('Section title is required', 'error'); return }
    try {
      await axios.post(`${API}/sections`, { title: sTitle, description: desc }, { headers: authHeaders })
      setShowSectionModal(false)
      addToast('Section created!', 'success')
      fetchSections()
    } catch (e) { addToast(getError(e), 'error') }
  }

  const handleUpdateSection = async (sTitle, desc) => {
    if (!sTitle.trim()) { addToast('Section title is required', 'error'); return }
    try {
      await axios.put(`${API}/sections/${editingSection._id}`, { title: sTitle, description: desc }, { headers: authHeaders })
      setEditingSection(null)
      addToast('Section updated!', 'success')
      fetchSections()
    } catch (e) { addToast(getError(e), 'error') }
  }

  const deleteSection = async (id) => {
    try {
      await axios.delete(`${API}/sections/${id}`, { headers: authHeaders })
      if (activeSection === id) setActiveSection(null)
      addToast('Section deleted.', 'info')
      fetchSections()
    } catch (e) { addToast(getError(e), 'error') }
  }

  // ── Notes ──────────────────────────────────────────────────────────────────
  const fetchNotes = async (sectionId = activeSection) => {
    if (!token) return
    try {
      const url = `${API}/notes` + (sectionId ? `?section=${sectionId}` : `?standalone=true`)
      const res = await axios.get(url, { headers: authHeaders })
      setNotes(res.data)
    } catch (e) { addToast(getError(e), 'error') }
  }

  useEffect(() => {
    if (token && currentUser?.role !== 'admin') {
      fetchNotes(activeSection)
      fetchSections()
    }
  }, [token, activeSection])

  useEffect(() => {
    const t = localStorage.getItem('draftTitle')
    const c = localStorage.getItem('draftContent')
    if (t) setTitle(t)
    if (c) setContent(c)
    const saved = localStorage.getItem('modalNote')
    if (saved) setSelectedNote(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('draftTitle',   title)
    localStorage.setItem('draftContent', content)
  }, [title, content])

  useEffect(() => {
    if (!selectedNote) return
    localStorage.setItem('modalNote', JSON.stringify(selectedNote))
  }, [selectedNote])

  const addNote = async () => {
    if (!title || !content) { addToast('Please fill in both title and content.', 'error'); return }
    try {
      await axios.post(`${API}/notes`, { title, content, sectionId: activeSection }, { headers: authHeaders })
      setTitle(''); setContent('')
      localStorage.removeItem('draftTitle')
      localStorage.removeItem('draftContent')
      addToast('Note added!', 'success')
      fetchNotes(activeSection)
    } catch (e) { addToast(getError(e), 'error') }
  }

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API}/notes/${id}`, { headers: authHeaders })
      addToast('Note deleted.', 'info')
      fetchNotes(activeSection)
    } catch (e) { addToast(getError(e), 'error') }
  }

  const saveNote = async (editedNote) => {
    try {
      await axios.put(`${API}/notes/${editedNote._id}`, { title: editedNote.title, content: editedNote.content }, { headers: authHeaders })
      addToast('Note saved!', 'success')
      fetchNotes(activeSection)
      localStorage.removeItem('modalNote')
      setSelectedNote(null)
    } catch (e) { addToast(getError(e), 'error') }
  }

  const filteredNotes      = notes.filter((n) => n.title.toLowerCase().includes(search.toLowerCase()))
  const activeSectionData  = sections.find((s) => s._id === activeSection)

  // ══════════════════════════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════════════════════════

  return (
    <>
      <Toast toasts={toasts} removeToast={removeToast} />

      {showSectionModal && (
        <SectionModal onClose={() => setShowSectionModal(false)} onSave={handleCreateSection} />
      )}
      {editingSection && (
        <SectionModal initial={editingSection} onClose={() => setEditingSection(null)} onSave={handleUpdateSection} />
      )}
      {selectedNote && (
        <NoteModal
          note={selectedNote}
          onClose={() => { localStorage.removeItem('modalNote'); setSelectedNote(null) }}
          onSave={(editedNote) => saveNote(editedNote)}
        />
      )}

      {/* ── Not logged in → Auth form ── */}
      {!token && (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white/10 p-8 rounded-3xl border border-white/5">
            <div className="flex items-center gap-3 mb-8">
              <FaStickyNote className="text-3xl text-cyan-400" />
              <h1 className="text-3xl font-bold">Notes App</h1>
            </div>

            {/* Login / Register tabs */}
            <div className="flex bg-white/5 rounded-xl p-1 mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition
                  ${isLogin ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:text-white'}`}
              >Login</button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition
                  ${!isLogin ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:text-white'}`}
              >Register</button>
            </div>

            {!isLogin && (
              <input type="text" placeholder="Full Name" value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 rounded-xl bg-white/10 outline-none mb-4 placeholder-gray-500" />
            )}
            <input type="email" placeholder="Email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-xl bg-white/10 outline-none mb-4 placeholder-gray-500" />
            <input type="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (isLogin ? loginUser() : registerUser())}
              className="w-full p-4 rounded-xl bg-white/10 outline-none mb-6 placeholder-gray-500" />

            <button
              onClick={isLogin ? loginUser : registerUser}
              className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl w-full font-semibold transition"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </div>
        </div>
      )}

      {/* ── Admin logged in → Admin Dashboard ── */}
      {token && currentUser?.role === 'admin' && (
        <AdminDashboard
          token={token}
          addToast={addToast}
          onLogout={logoutUser}
          currentUser={currentUser}
        />
      )}

      {/* ── Regular user logged in → Notes App ── */}
      {token && currentUser?.role !== 'admin' && (
        <div className="min-h-screen bg-slate-950 text-white p-6">

          {/* Header */}
          <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <FaStickyNote className="text-4xl text-cyan-400" />
              <h1 className="text-4xl font-bold">Notes App</h1>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-xl">
                <FaSearch className="text-gray-400" />
                <input
                  type="text" placeholder="Search notes..." value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent outline-none w-40"
                />
              </div>
              <button onClick={logoutUser}
                className="bg-red-500 hover:bg-red-600 px-4 py-3 rounded-xl text-sm font-semibold transition">
                Logout
              </button>
            </div>
          </div>

          {/* Section tabs */}
          <div className="mb-6">
            <div className="flex gap-2 flex-wrap items-center">
              <button
                onClick={() => setActiveSection(null)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition
                  ${activeSection === null ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' : 'bg-white/10 hover:bg-white/20 text-gray-300'}`}
              >
                <FaStickyNote /> My Notes
              </button>
              {sections.map((sec) => (
                <div key={sec._id} className="flex items-center gap-1 group">
                  <button
                    onClick={() => setActiveSection(sec._id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition
                      ${activeSection === sec._id ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30' : 'bg-white/10 hover:bg-white/20 text-gray-300'}`}
                  >
                    {activeSection === sec._id ? <FaFolderOpen /> : <FaFolder />}
                    {sec.title}
                     <span className="text-xs opacity-50 font-normal">
    {new Date(sec.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short' })}
  </span>
                  </button>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button onClick={() => setEditingSection(sec)}
                      className="text-gray-400 hover:text-purple-400 text-xs px-1 transition"><FaEdit /></button>
                    <button onClick={() => deleteSection(sec._id)}
                      className="text-gray-400 hover:text-red-400 text-xs px-1 transition"><FaTrash /></button>
                  </div>
                </div>
              ))}
              <button onClick={() => setShowSectionModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
                  bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 border border-purple-500/30 hover:border-purple-500/60 transition">
                <FaPlus /> Add Section
              </button>
            </div>
            {activeSectionData?.description && (
              <p className="mt-3 text-sm text-gray-400 pl-1">{activeSectionData.description}</p>
            )}
          </div>

          {/* Add Note form */}
          <div className="bg-white/10 p-6 rounded-3xl mb-10 backdrop-blur-lg border border-white/5">
            {activeSectionData && (
              <div className="mb-4 flex items-center gap-2 text-sm text-purple-300">
                <FaFolder />
                <span>Adding to: <strong>{activeSectionData.title}</strong></span>
              </div>
            )}
            <input type="text" placeholder="Enter title" value={title} autoComplete="off"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 rounded-xl bg-white/10 outline-none mb-4 placeholder-gray-500" />
            <textarea placeholder="Write note..." value={content} autoComplete="off"
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 rounded-xl bg-white/10 outline-none mb-4 min-h-[120px] resize-none placeholder-gray-500" />
            <div className="flex gap-3 flex-wrap">
              <button onClick={addNote}
                className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition shadow-lg shadow-cyan-500/20">
                <FaPlus /> Add Note
              </button>
              <button onClick={() => setShowSectionModal(true)}
                className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition shadow-lg shadow-purple-500/20">
                <FaPlus /> Add Section
              </button>
            </div>
          </div>

          {/* Notes grid */}
          {filteredNotes.length === 0 ? (
            <div className="text-center mt-20">
              <FaStickyNote className="text-6xl text-gray-700 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4 text-gray-400">No Notes Found</h2>
              <p className="text-gray-500">
                {activeSection ? `No notes in "${activeSectionData?.title}" yet.` : 'Start adding your notes above.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <div key={note._id}
                  className="bg-white/10 rounded-3xl p-6 backdrop-blur-lg shadow-xl hover:scale-[1.02] transition border border-white/5 hover:border-white/10">
                  <h2 className="text-xl font-bold mb-3 line-clamp-1">{note.title}</h2>
                  <p className="text-gray-400 mb-6 line-clamp-3 text-sm leading-relaxed">{note.content}</p>
                  <p className="text-xs text-gray-500 mb-3">
  {note.updatedAt !== note.createdAt
    ? `✏️ Updated · ${new Date(note.updatedAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}`
    : `🗓️ Created · ${new Date(note.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}`
  }
</p>
                  <div className="flex gap-3 flex-wrap">
                    <button onClick={() => setSelectedNote(note)}
                      className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-semibold transition">
                      <FaEye /> Open
                    </button>
                    <button onClick={() => deleteNote(note._id)}
                      className="bg-red-500/80 hover:bg-red-500 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-semibold transition">
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in { animation: slide-in 0.3s ease forwards; }
      `}</style>
    </>
  )
}

export default App