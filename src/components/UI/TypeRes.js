import { useEffect, useRef, useState } from 'react'
import useReSize from '../../hooks/useReSize'
import classes from './TypeRes.module.css'
const TypeRes = props => {
  const [width, setWidth] = useState(0)
  const size = useReSize([], s => s)
  const sizeRef = useRef(null)
  useEffect(() => {
    if (sizeRef.current) {
      if (size < 1200 + 17) {
        setWidth(sizeRef.current.getBoundingClientRect().width)
      }
    }
  }, [size])
  let times = []
  if (props.times.time.status) {
    times = props.times.time.schedule.map((t, i) => {
      const convertTime = +t.slice(0, 2)
      const transformTime = (convertTime / 24) * width
      const active =
        t === props.chooseTime.time &&
        props.chooseTime.type === props.times.type
      return (
        <button
          key={i}
          className={active ? classes.active : ''}
          style={{ transform: `translateX(${transformTime}px)` }}
          onClick={props.onChooseTime.bind(null, {
            time: t,
            type: props.times.type,
          })}
        >
          {t}
        </button>
      )
    })
  }

  //   })
  return (
    <div className={classes.typeRes}>
      <p>{props.times.type}</p>
      <div className={classes.time} ref={sizeRef}>
        {times}
      </div>
    </div>
  )
}
export default TypeRes
