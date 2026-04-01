import { useEffect, useState } from "react";
import Auth from "./Auth";
const BASE_URL = import.meta.env.VITE_API_URL
function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // ✅ FIXED: handle user condition properly
  useEffect(() => {
    if (!user) {
      setLoading(false); // 🔥 VERY IMPORTANT
      return;
    }

    setLoading(true);

    fetch(`${BASE_URL}/api/notes`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  // ✅ AUTH SCREEN
  if (!user) {
    return <Auth setUser={setUser} />;
  }

  // ✅ LOADING SCREEN
  if (loading) {
    return (
      <h1 className="text-white text-center mt-10 text-xl">
        Loading...
      </h1>
    );
  }

  // ADD NOTE
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) return alert("Fill all fields");

    fetch(`${BASE_URL}/api/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ title, content }),
    })
      .then((res) => res.json())
      .then((newNote) => {
        setNotes([...notes, newNote]);
        setTitle("");
        setContent("");
      });
  };

  // DELETE
  const deleteNote = (id) => {
    fetch(`${BASE_URL}/api/notes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }).then(() => {
      setNotes(notes.filter((n) => n._id !== id));
    });
  };

  // EDIT
  const editNote = (note) => {
    const updatedTitle = prompt("Enter new title", note.title);
    const updatedContent = prompt("Enter new content", note.content);

    if (!updatedTitle || !updatedContent) return;

    fetch(`${BASE_URL}api/notes/${note._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        title: updatedTitle,
        content: updatedContent,
      }),
    }).then(() => {
      setNotes(
        notes.map((n) =>
          n._id === note._id
            ? { ...n, title: updatedTitle, content: updatedContent }
            : n
        )
      );
    });
  };

  // return (
  //   <div className="min-h-screen bg-linear-to-bl from-blue-900 via-blue-800 to-black text-white flex justify-center p-6">
  //     <div className="w-full max-w-2xl">

  //       {/* LOGOUT */}
  //       <button
  //         onClick={() => {
  //           localStorage.removeItem("user");
  //           setUser(null);
  //         }}
  //         className="mb-4 bg-red-500 px-3 py-1 rounded"
  //       >
  //         Logout
  //       </button>

  //       <h1 className="text-4xl font-bold text-center mb-6 text-yellow-400">
  //         📝 Notes App
  //       </h1>

  //       {/* FORM */}
  //       <form
  //         onSubmit={handleSubmit}
  //         className="bg-blue-950 p-5 rounded-xl border border-yellow-400 mb-6"
  //       >
  //         <input
  //           className="w-full p-3 mb-3 bg-blue-900 border border-yellow-400 rounded"
  //           placeholder="Title..."
  //           value={title}
  //           onChange={(e) => setTitle(e.target.value)}
  //         />

  //         <textarea
  //           className="w-full p-3 mb-3 bg-blue-900 border border-yellow-400 rounded"
  //           placeholder="Content..."
  //           value={content}
  //           onChange={(e) => setContent(e.target.value)}
  //         />

  //         <button className="w-full bg-yellow-400 text-black py-2 rounded">
  //           Add Note
  //         </button>
  //       </form>

  //       {/* NOTES */}
  //       <div className="space-y-4">
  //         {notes.map((note) => (
  //           <div
  //             key={note._id}
  //             className="bg-blue-950 border border-yellow-400 p-4 rounded"
  //           >
  //             <h3 className="text-yellow-300 font-semibold text-lg">
  //               {note.title}
  //             </h3>

  //             <p className="mt-2">{note.content}</p>

  //             <div className="mt-3 flex gap-3">
  //               <button
  //                 onClick={() => deleteNote(note._id)}
  //                 className="bg-red-500 px-3 py-1 rounded"
  //               >
  //                 Delete
  //               </button>

  //               <button
  //                 onClick={() => editNote(note)}
  //                 className="bg-green-500 px-3 py-1 rounded"
  //               >
  //                 Edit
  //               </button>
  //             </div>
  //           </div>
  //         ))}
  //       </div>

  //     </div>
  //   </div>
  // );
  return (
  <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black text-gray-100 flex justify-center p-6">
    <div className="w-full max-w-3xl">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">
          Notes
        </h1>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            setUser(null);
          }}
          className="bg-red-500/90 hover:bg-red-600 transition px-4 py-2 rounded-lg text-sm font-medium shadow-md"
        >
          Logout
        </button>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900/60 backdrop-blur-md p-6 rounded-2xl border border-gray-800 shadow-lg mb-8"
      >
        <input
          className="w-full p-3 mb-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full p-3 mb-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          placeholder="Write your note..."
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button className="w-full bg-indigo-500 hover:bg-indigo-600 transition py-2 rounded-lg font-medium shadow-md">
          Add Note
        </button>
      </form>

      {/* NOTES */}
      <div className="grid gap-4">
        {notes.map((note) => (
          <div
            key={note._id}
            className="bg-gray-900/60 backdrop-blur-md border border-gray-800 p-5 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <h3 className="text-lg font-semibold text-indigo-400">
              {note.title}
            </h3>

            <p className="mt-2 text-gray-300 leading-relaxed">
              {note.content}
            </p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => deleteNote(note._id)}
                className="bg-red-500/90 hover:bg-red-600 transition px-4 py-1.5 rounded-lg text-sm"
              >
                Delete
              </button>

              <button
                onClick={() => editNote(note)}
                className="bg-emerald-500/90 hover:bg-emerald-600 transition px-4 py-1.5 rounded-lg text-sm"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  </div>
);
}

export default App;