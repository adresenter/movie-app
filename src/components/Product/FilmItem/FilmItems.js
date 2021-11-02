import classes from './FilmItems.module.css'
import Card from '../../UI/Card'

const FilmItems = props => {
  const commingFilms = props.films.map(film => {
    return (
      <Card
        filmId={film.id}
        key={film.id}
        poster={film.poster}
        name={film.name}
        time={film.time}
        type={film.type}
        calendar={film.premiere}
        comming={props.comming}
      />
    )
  })
  return <div className={classes.items}>{commingFilms}</div>
}
export default FilmItems
