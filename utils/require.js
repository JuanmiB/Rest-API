import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
export const readJSON = (path) => require(path)
// como leer un json en ES6
// import fs from 'node:fs'
// import movies from './movies.json'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))
