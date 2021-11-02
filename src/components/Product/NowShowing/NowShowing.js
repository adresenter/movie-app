import HeaderTitle from '../../UI/HeaderTitle'
import FilmItems from '../FilmItem/FilmItems'
import classes from './NowShowing.module.css'

import { useSelector } from 'react-redux'
import useReSize from '../../../hooks/useReSize'
const NowShowing = () => {
  const filmsState = useSelector(state => state.films.films)
  const films = useReSize(filmsState)

  return (
    <div className={classes.nowShowing}>
      <HeaderTitle name='phim đang chiếu' now />
      <div className={classes.nowFilm}>
        <FilmItems films={films} />
      </div>
    </div>
  )
}
export default NowShowing
