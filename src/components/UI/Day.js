import classes from './Day.module.css'
const Day = props => {
  return (
    <div
      className={`${classes.date} ${props.active ? classes.active : ''}`}
      onClick={props.clicked}
    >
      <p>thứ 2</p>
      <p className={classes.day}>{props.day}</p>
    </div>
  )
}
export default Day
