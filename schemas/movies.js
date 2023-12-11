import { z } from 'zod'
// hay que validar los datos
// utilizo el paquete zod para validar los datos
// creao un esquema de validación de las películas
const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'El título debe ser un texto',
    too_short_error: 'El título debe tener al menos 1 caracter',
    too_long_error: 'El título debe tener como máximo 45 caracteres',
    required_error: 'El título es obligatorio'
  }).min(1).max(105),
  year: z.number().int().min(1895).max(2024),
  director: z.string().min(1).max(40),
  duration: z.number().int().min(1).max(400),
  // colocamos un enum para que solo se puedan elegir los géneros que queremos
  genre: z.array(z.enum(['Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western'])).min(1).max(5),
  rate: (z.number().min(0).max(10)).optional(),
  poster: z.string().url()
})
export function validateMovie (object) {
  return movieSchema.safeParse(object)
}

// con partial() le decimos que no es obligatorio que vengan todos los datos
// si esta, lo valida, sino lo ignora
export function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}
