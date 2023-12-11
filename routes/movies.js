import { Router } from 'express'
import { readJSON } from '../utils/require'
import { validateMovie, validatePartialMovie } from '../schemas/movies'
import { randomUUID } from 'node:crypto'

export const moviesRouter = Router()
const movies = readJSON('./movies.json')

moviesRouter.get('/', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
    return res.json(filteredMovies)
  }
  return res.json(movies)
})

moviesRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) {
    res.json(movie)
  } else {
    res.status(404).json({ message: 'Película no encontrada' })
  }
})

moviesRouter.post('/', (req, res) => {
  const result = validateMovie(req.body)
  if (!result.success) {
    // si hay un error en la validación, devolvemos un error 422
    return res.status(422).json({ error: JSON.parse(result.error.message) })
  }
  const newMovie = {
    id: randomUUID(),
    // aca los datos ya estan validados por ende nos aseguramos que son correctos
    ...result.data
  }
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

moviesRouter.patch('/:id', (req, res) => {
  const { id } = req.params
  const result = validatePartialMovie(req.body)
  // si hay un error en la validación, devolvemos un error 422
  if (!result.success) {
    return res.status(422).json({ error: JSON.parse(result.error.message) })
  }
  // buscamos la película por id
  const movieIndex = movies.findIndex(movie => movie.id === id)
  // si no existe, devolvemos un error 404
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Película no encontrada' })
  }
  // si existe, la actualizamos
  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data
  }
  movies[movieIndex] = updatedMovie
  return res.json(updatedMovie)
})

moviesRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Película no encontrada' })
  }
  movies.splice(movieIndex, 1)
  return res.json({ success: true })
})
