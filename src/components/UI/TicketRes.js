import classes from './TicketRes.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useCallback } from 'react'
import ScheduleDate from './ScheduleTable/ScheduleDate'
import TypeRes from './TypeRes'
import { resetTime, setTime } from '../../store/reducer/FilmsUI'
import useReSize from '../../hooks/useReSize'
import TypePhone from './TypePhone'
const TicketRes = () => {
  const [dayActive, setDayActive] = useState(2)
  const [width, setWidth] = useState(0)
  const [chooseTime, setChooseTime] = useState('')

  const size = useReSize([], s => s)
  const filmsState = useSelector(state => state.films.films)
  const filmIdCurrentState = useSelector(state => state.filmsUI.filmIdCurrent)
  const dispatch = useDispatch()

  const film = filmsState.filter(film => film.id === filmIdCurrentState)
  const calendar = film[0].calendar.slice().sort((a, b) => {
    return +a.day - +b.day
  })

  const times = []
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width)
    }
  }, [])
  const chooseTimeHandler = data => {
    setChooseTime({ day: calendar[dayActive].day, ...data })
    dispatch(setTime({ day: calendar[dayActive].day, ...data }))
  }

  const changeDayActiveHandler = id => {
    setChooseTime({ day: calendar[dayActive].day })
    dispatch(resetTime())
    setDayActive(id)
  }
  const days = calendar.map((day, id) => {
    if (dayActive === id) {
      for (let key in day) {
        if (key === 'day') continue
        times.push(
          <TypeRes
            key={key}
            times={{ type: key, time: day[key] }}
            width={width}
            chooseTime={chooseTime}
            onChooseTime={chooseTimeHandler}
          />
        )
      }
    }
    return (
      <ScheduleDate
        active={dayActive === id}
        key={day.day}
        day='chủ nhật'
        date={day.day}
        month='tháng 10'
        id={id}
        clicked={changeDayActiveHandler}
      />
    )
  })

  return (
    <div className={classes.ticketContainer}>
      <div className={classes.ticket}>
        <div
          className={classes.ticketPoster}
          style={{ backgroundImage: `url(${film[0].poster})` }}
        ></div>
        <div className={classes.ticketContent}>
          <div className={classes.content}>
            <div className={classes.name}>
              <h4>{film[0].name}</h4>
              <p>{film[0].time} phút</p>
              <p>{film[0].type}</p>
            </div>
            <p className={classes.imdb}>imdb:{film[0].imdb}</p>
          </div>
          <div className={classes.ticketDays}>{days}</div>
        </div>
      </div>
      <div className={classes.typeContent} ref={measuredRef}>
        {size > 700 ? times : <TypePhone data={calendar} />}
      </div>
    </div>
  )
}
export default TicketRes
