import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { resetTime, setTime } from '../../../store/reducer/FilmsUI'
import FormatFilm from './FormatFilm'
import ScheduleDate from './ScheduleDate'
import classes from './ScheduleTable.module.css'

const DateTable = props => {
  const [dayActive, setDayActive] = useState(2)
  const [chooseTime, setChooseTime] = useState('')
  const dispatch = useDispatch()
  const calendar = props.film[0].calendar.slice().sort((a, b) => {
    return +a.day - +b.day
  })

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

  const premieres = []
  for (let time in calendar[dayActive]) {
    const current = calendar[dayActive]
    if (time !== 'day') {
      premieres.push({ type: time, ...current[time] })
    }
  }
  const time = premieres.map(premiere => {
    return (
      <FormatFilm
        key={premiere.type}
        type={premiere.type}
        status={premiere.status}
        times={premiere.schedule}
        chooseTime={chooseTime}
        onChooseTime={chooseTimeHandler}
      />
    )
  })
  return (
    <div className={classes.scheduleContent}>
      <div className={classes.scheduleDate}>
        <div className={classes.poster}></div>
        <div className={classes.date}>{days}</div>
      </div>
      <div>{time}</div>
    </div>
  )
}
export default DateTable
