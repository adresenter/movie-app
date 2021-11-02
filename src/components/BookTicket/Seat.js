import SeatButton from '../UI/SeatButton'
import classes from './Seat.module.css'
const Seat = props => {
  const seat = props.seats.column.map((seat, i) => (
    <SeatButton
      key={props.seats.row + seat + i}
      seatId={seat}
      id={props.seats.row + ' ' + seat}
      choosed={props.seatActive}
    />
  ))
  return (
    <div className={classes.seat}>
      <p>{props.seats.row}</p>
      <div className={classes.number}>{seat}</div>
      <p>{props.seats.row}</p>
    </div>
  )
}
export default Seat
