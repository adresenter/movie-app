import { useState, useEffect } from 'react'
const reSizeFilm = (size, filmsState) => {
  let films = []
  if (size > 1250) {
    if (films.length === 0 || films.length !== 5) {
      films = filmsState.slice(0, 5)
    }
  } else if (size > 960 && size <= 1250) {
    if (films.length === 0 || films.length !== 4) {
      films = filmsState.slice(0, 4)
    }
  } else if (size > 768 && size <= 960) {
    if (films.length === 0 || films.length !== 3) {
      films = filmsState.slice(0, 3)
    }
  } else if (size < 768) {
    if (films.length === 0 || films.length !== 4) {
      films = filmsState.slice(0, 4)
    }
  }
  return films
}
const useReSize = (filmsState = [], func = reSizeFilm) => {
  const [size, setSize] = useState(window.innerWidth)

  useEffect(() => {
    const chooseFilmHandler = () => {
      setSize(window.innerWidth)
    }
    window.addEventListener('resize', chooseFilmHandler)

    return _ => {
      window.removeEventListener('resize', chooseFilmHandler)
    }
  }, [])
  return func(size, filmsState)
}
export default useReSize
