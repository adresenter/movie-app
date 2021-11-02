import ScheduleItem from './ScheduleItem'
import classes from './ScheduleList.module.css'
import {
  BsChevronLeft,
  BsChevronRight,
  BsChevronDown,
  BsChevronUp,
} from 'react-icons/bs'
import { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import useReSize from '../../../../hooks/useReSize'

const ScheduleList = props => {
  const filmsState = useSelector(state => state.films.films)
  const filmsUIId = useSelector(state => state.filmsUI.filmIdCurrent)

  const [sliceFilm, setSlideFilm] = useState(0)
  const size = useReSize([], s => s)
  const films = filmsState.map(film => {
    return (
      <ScheduleItem
        size={size}
        key={film.id}
        filmId={film.id}
        poster={film.img}
        sliceFilm={sliceFilm}
        active={filmsUIId === film.id}
      />
    )
  })
  let rangeFilm = 0
  if (size > 1200) rangeFilm = 4
  else if (size < 1200 && size > 960) rangeFilm = 5
  else if (size < 960 && size > 700) rangeFilm = 6
  else if (size < 700) rangeFilm = 5
  const nextFilmHandler = () => {
    let updateSlicefilm = sliceFilm + 1
    if (updateSlicefilm === rangeFilm) {
      updateSlicefilm = 0
    }
    setSlideFilm(updateSlicefilm)
  }
  const prevFilmHandler = () => {
    let updateSlicefilm = sliceFilm - 1
    if (updateSlicefilm === -1) {
      updateSlicefilm = rangeFilm - 1
    }
    setSlideFilm(updateSlicefilm)
  }
  return (
    <Fragment>
      <div className={classes.list}>
        <div className={classes.scheduleList}>
          <div className={classes.left} onClick={prevFilmHandler}>
            {size > 700 ? (
              <BsChevronLeft color='white' size='30px' />
            ) : (
              <BsChevronUp color='white' size='30px' />
            )}
          </div>
          <div className={classes.imgBox}>
            <div className={classes.imgs}>{films}</div>
          </div>
          <div className={classes.right} onClick={nextFilmHandler}>
            {size > 700 ? (
              <BsChevronRight color='white' size='30px' />
            ) : (
              <BsChevronDown color='white' size='30px' />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  )
}
export default ScheduleList
