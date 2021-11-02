import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addSeat } from '../../store/reducer/FilmsUI'
import classes from './SeatButton.module.css'
const SeatButton = props => {
  const dispatch = useDispatch()
  const [seatId, setSeatId] = useState(false)
  const isSeat =
    props.choosed.length > 0
      ? props.choosed.some(item => item === props.id)
      : false

  const color = isSeat ? 'white' : seatId ? '#ff2c1f' : '#3a3a3a'
  const chooseSeatHandler = () => {
    setSeatId(state => !state)
    dispatch(addSeat(props.id))
  }
  return (
    <button
      style={{ background: `${color}` }}
      className={
        isSeat
          ? classes.choosed
          : props.seatId !== -1
          ? classes.SeatButton
          : classes.active
      }
      onClick={
        isSeat ? () => {} : props.seatId === -1 ? () => {} : chooseSeatHandler
      }
    ></button>
  )
}
export default SeatButton
