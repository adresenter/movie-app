import { useDispatch } from 'react-redux'
import { replaceId } from '../../../../store/reducer/FilmsUI'
import classes from './ScheduleItem.module.css'

const ScheduleItem = props => {
  const dispatch = useDispatch()
  const changeActiveImgHandler = id => {
    dispatch(replaceId({ filmId: id }))
  }
  return (
    <div
      className={classes.img}
      onClick={changeActiveImgHandler.bind(null, props.filmId)}
      style={{
        transform: `translate${props.size > 700 ? 'X' : 'Y'}(calc(-${
          props.sliceFilm * 100
        }% - ${props.sliceFilm * 20}px))`,
      }}
    >
      <img src={props.poster} alt='' />
      {!props.active && <div className={classes.active}></div>}
    </div>
  )
}
export default ScheduleItem
