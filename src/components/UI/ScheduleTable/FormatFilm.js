import classes from './FormatFilm.module.css'
import { GiCheckMark } from 'react-icons/gi'
import { useState, useRef, useEffect, useCallback } from 'react'
import useReSize from '../../../hooks/useReSize'

const FormatFilm = props => {
  const [width, setWidth] = useState(0)
  const size = useReSize([], s => s)
  const sizeRef = useRef(null)
  const sizeChangeHandler = useCallback(() => {
    const sizeChange = width === sizeRef.current.getBoundingClientRect().width
    if (sizeChange) return
    if (size >= 1200) {
      setWidth(sizeRef.current.getBoundingClientRect().width)
    } else if (size < 1200 && size >= 1024) {
      setWidth(sizeRef.current.getBoundingClientRect().width)
    }
  }, [size, width])
  useEffect(() => {
    if (sizeRef.current) {
      sizeChangeHandler()
    }
  }, [sizeChangeHandler])

  let times = []
  if (props.status) {
    times = props.times.map((time, id) => {
      const convertTime = +time.slice(0, 2)
      const transformTime = (convertTime / 24) * width
      const active =
        time === props.chooseTime.time && props.chooseTime.type === props.type
      return (
        <button
          className={active ? classes.active : ''}
          key={id}
          style={{ transform: `translateX(${transformTime}px)` }}
          onClick={props.onChooseTime.bind(null, {
            time: time,
            type: props.type,
          })}
        >
          {time}
        </button>
      )
    })
  }

  return (
    <div className={classes.formatFilm}>
      <div className={props.status ? classes.format : classes.notActive}>
        <p>
          {props.type}
          {props.status && <GiCheckMark />}
        </p>
      </div>
      <div className={classes.time} ref={sizeRef}>
        {times}
      </div>
    </div>
  )
}
export default FormatFilm
