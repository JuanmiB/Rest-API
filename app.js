import express, { json } from 'express'
import cors from 'cors'
import { moviesRouter } from './routes/movies'
const app = express()
app.use(json())
app.use(cors())
app.disable('x-powered-by')

// separo todas las rutas que tienn que ver con movies en un archivo aparte
// cada vez que se haga un request a /movies, se va a ejecutar el router de movies
app.use('/movies', moviesRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto http://localhost:${PORT}/`)
})
