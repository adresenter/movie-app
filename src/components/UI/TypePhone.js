import { useEffect, useState } from 'react'
import React from 'react'
import classes from './TypePhone.module.css'
import { useDispatch } from 'react-redux'
import { resetTime, setTime } from '../../store/reducer/FilmsUI'
import { useSelector } from 'react-redux'
const TypePhone = props => {
  const filmIdState = useSelector(state => state.filmsUI.filmIdCurrent)
  const dispatch = useDispatch()

  const [dayHidden, setDayHidden] = useState(false)
  const [typeHidden, setTypeHidden] = useState(false)
  const [timeHidden, setTimeHidden] = useState(false)

  const [dayActive, setDayActive] = useState(null)
  const [typeActive, setTypeActive] = useState(null)
  const [timeActive, setTimeActive] = useState(null)

  useEffect(() => {
    setDayActive(null)
    setTypeActive(null)
    setTimeActive(null)
    dispatch(resetTime())
  }, [dispatch, filmIdState])

  const daysHiddenHandler = () => {
    if (!dayHidden) {
      setTypeHidden(false)
      setTimeHidden(false)
      setDayHidden(true)
    } else {
      setDayHidden(false)
    }
  }
  const typeHiddenHandler = () => {
    if (!typeHidden) {
      setTypeHidden(true)
      setTimeHidden(false)
      setDayHidden(false)
    } else {
      setTypeHidden(false)
    }
  }
  const timeHiddenHandler = () => {
    if (!timeHidden) {
      setTypeHidden(false)
      setTimeHidden(true)
      setDayHidden(false)
    } else {
      setTimeHidden(false)
    }
  }

  const chooseDayHandler = id => {
    setDayActive(id)
    if (id === dayActive) return
    setTypeActive(null)
    setTimeActive(null)
  }
  const chooseTypeHandler = id => {
    setTypeActive(id)
    if (id === typeActive) return
    setTimeActive(null)
  }
  const chooseTimeHandler = id => {
    setTimeActive(id)
    dispatch(setTime({ day: dayActive, type: typeActive, time: id }))
  }

  const dayData = []
  const typeData = []
  let timeData = []
  props.data.forEach((day, id) => {
    dayData.push(day.day)

    if (dayActive) {
      if (day.day === dayActive) {
        for (let key in day) {
          if (key === 'day') continue
          if (!day[key].status) continue
          typeData.push(
            <p
              key={key}
              onClick={chooseTypeHandler.bind(null, key)}
              className={key === typeActive ? classes.daysActive : ''}
            >
              {key}
            </p>
          )
        }
      }
    }
    if (typeActive) {
      if (day.day === dayActive) {
        timeData = day[typeActive].schedule.map((t, id) => {
          return (
            <p
              key={id}
              className={t === timeActive ? classes.daysActive : ''}
              onClick={chooseTimeHandler.bind(null, t)}
            >
              {t}
            </p>
          )
        })
      }
    }
  })

  const days = dayData.map((day, id) => {
    return (
      <p
        className={day === dayActive ? classes.daysActive : ''}
        key={id}
        onClick={chooseDayHandler.bind(null, day)}
      >
        {day}
      </p>
    )
  })

  const typeElement = (
    <div className={classes.type}>
      <h5>chọn định dạng:</h5>
      <div
        className={`${classes.typeContent} ${typeHidden && classes.active} `}
        onClick={typeHiddenHandler}
      >
        {typeActive ? (
          <span className={classes.spanActive}>{typeActive}</span>
        ) : (
          <span>chọn </span>
        )}
        {typeData}
      </div>
    </div>
  )
  const timeElement = (
    <div className={classes.times}>
      <h5>chọn thời gian:</h5>
      <div
        className={`${classes.timescontent} ${timeHidden && classes.active} `}
        onClick={timeHiddenHandler}
      >
        {timeActive ? (
          <span className={classes.spanActive}>{timeActive}</span>
        ) : (
          <span>chọn </span>
        )}
        {timeData}
      </div>
    </div>
  )
  return (
    <div className={classes.typePhone}>
      <div className={classes.days}>
        <h5>chọn ngày:</h5>
        <div
          className={`${classes.daysContent} ${dayHidden && classes.active} `}
          onClick={daysHiddenHandler}
        >
          {dayActive ? (
            <span className={classes.spanActive}>{dayActive}</span>
          ) : (
            <span>chọn </span>
          )}
          {days}
        </div>
      </div>
      {dayActive && typeElement}
      {typeActive && timeElement}
    </div>
  )
}
export default TypePhone
