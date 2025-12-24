const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
app.use(cors())
const Movie = require('./models/Movies')
app.use(express.json())
app.listen(3000,()=>{
     console.log("Server is running on port 3000")
})
mongoose.connect("mongodb://127.0.0.1:27017/moviesDB")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("DB Connection Error", err))

app.get("/",(req,res)=>{
res.send("API is running....");
})

app.get('/api/lists', async (req, res) => {
    try {
        const Movies = await Movie.find()
        res.json(Movies)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});
app.get('/api/lists/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
        if (!movie) return res.status(404).json({ message: 'Book not found' })
        res.json(movie)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

app.post('/api/lists', async (req, res) => {
    try {
        const { title, genre , rating } = req.body
        const newMovie = new Movie({ title, genre , rating })
        await newMovie.save()
        res.status(201).json(newMovie)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});
app.put('/api/lists/:id', async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(updatedMovie)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});


app.delete('/api/lists/:id', async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.json({ message: 'Movie deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});