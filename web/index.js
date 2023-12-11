fetch('http://localhost:3000/movies')
  .then((response) => response.json())
  .then((movies) => {
    const moviesContainer = document.querySelector('main')
    movies.forEach((movie) => {
      const movieElement = document.createElement('div')
      movieElement.innerHTML = `
                <article>
                <h3>${movie.title}</h3>
                <img src="${movie.poster}" alt="${movie.title}" width=300 heigth="300">
                <p>${movie.year}</p>
                <p>${movie.director}</p>
                <button>Eliminar</button>
                </article>
            `
      moviesContainer.appendChild(movieElement)

      const button = movieElement.querySelector('button')
      button.addEventListener('click', () => {
        fetch(`http://localhost:3000/movies/${movie.id}`, {
          method: 'DELETE'
        })
          .then((response) => response.json())
          .then(() => {
            movieElement.remove()
          })
      })
    })
  })
