import classes from '../NowShowing/NowShowing.module.css'
import FilmItems from '../FilmItem/FilmItems'
import HeaderTitle from '../../UI/HeaderTitle'
import { useSelector } from 'react-redux'
import useReSize from '../../../hooks/useReSize'
const CommingSoon = () => {
  const commingSoonState = useSelector(state => state.films.commingSoon)
  const films = useReSize(commingSoonState)
  return (
    <div className={classes.nowShowing}>
      <HeaderTitle name='phim Sắp chiếu' />
      <div className={classes.nowFilm}>
        <FilmItems comming films={films} />
      </div>
    </div>
  )
}
export default CommingSoon
