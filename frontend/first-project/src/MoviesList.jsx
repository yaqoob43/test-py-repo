import { useEffect, useState } from "react"

export default function Movieslist() {
  const [movies, setMovies] = useState([])
  const [watch, setWatch] = useState({
    title: "",
    genre: "",
    rating: ""
  })

  const API_URL = "http://localhost:3000/api/lists"

  const getMovies = async () => {
    const res = await fetch(API_URL)
    const data = await res.json()
    setMovies(data)
  };

  useEffect(() => {
    getMovies()
  }, [])

  function handleChange(e) {
    setWatch({ ...watch, [e.target.name]: e.target.value });
  }

  async function addList() {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(watch)
    });

    setWatch({ title: "", genre: "", rating: "" });
    getMovies();
  }

  async function deleteList(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    getMovies();
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0d0d1a] via-[#1a1a2f] to-[#0d0d1a] px-6 py-16 animate-gradient-xy text-white">
      <div className="max-w-3xl mx-auto space-y-12">
      <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse">Movies Manager</h2>
<div className="flex flex-col gap-4">
  <div className="flex flex-col md:flex-row gap-4">
    <input
      type="text"
      name="title"
      placeholder="Title"
      value={watch.title}
      onChange={handleChange}
      className="flex-1 px-5 py-3 rounded-2xl bg-white/10  border border-purple-600/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
    />

    <input
      type="text"
      name="genre"
      placeholder="Genre"
      value={watch.genre}
      onChange={handleChange}
      className="flex-1 px-5 py-3 rounded-2xl bg-white/10  border border-purple-600/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
    />

    <input
      type="number"
      name="rating"
      placeholder="Rating"
      value={watch.rating}
      onChange={handleChange}
      className="flex-1 px-5 py-3 rounded-2xl bg-white/10  border border-purple-600/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
    />
  </div>

  <button
    onClick={addList}
    className="bg-gradient-to-r from-pink-600 to-purple-600 
      hover:from-pink-500 hover:to-purple-500 
      transition px-7 py-3 rounded-2xl font-semibold 
      shadow-[0_10px_30px_rgba(255,0,255,0.3)] 
      hover:shadow-[0_15px_40px_rgba(255,0,255,0.5)] 
      hover:scale-105 duration-300 self-start"
  >
    Add Movie
  </button>
</div>
      <hr className="border-white/20" />

      <h3 className="text-3xl font-semibold  
      text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse">All Movies</h3>

      <div className="flex flex-col gap-5">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="bg-white/10 backdrop-blur-3xl border border-purple-600/20
                rounded-3xl p-6 flex justify-between items-start
                transition-all duration-500 hover:bg-white/20 hover:-translate-y-1
                hover:shadow-[0_15px_50px_rgba(128,0,128,0.4)]"
          >
            <div className="space-y-1">
            <h4 className="text-lg font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">{movie.title}</h4>
            <p className="text-sm text-white/70"><span className="text-white font-medium">Genre:</span> {movie.genre}</p>
            <p className="text-sm text-white/70"><span className="text-white font-medium">Rating:</span> {movie.rating}</p>
            </div>
            <button
              onClick={() => deleteList(movie._id)}
              className="text-sm text-red-400 hover:text-red-300 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>

  );
}
