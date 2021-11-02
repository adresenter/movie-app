import classes from './ScheduleDate.module.css'
const ScheduleDate = props => {
  const active = props.active ? classes.active : ''
  return (
    <div
      className={`${classes.date} ${active}`}
      onClick={props.clicked.bind(null, props.id)}
    >
      <p>{props.date}</p>
      <p>{props.month}</p>
    </div>
  )
}
export default ScheduleDate
