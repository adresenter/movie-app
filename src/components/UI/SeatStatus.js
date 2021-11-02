import classes from './SeatStatus.module.css'
const SeatStatus = props => {
  return (
    <div className={classes.SeatStatus}>
      <p style={{ color: `${props.color}` }}>{props.name}</p>
      <div
        className={classes.box}
        style={{ background: `${props.color}` }}
      ></div>
    </div>
  )
}
export default SeatStatus
