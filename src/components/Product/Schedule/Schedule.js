import classes from './Schedule.module.css'
import ScheduleTable from '../../UI/ScheduleTable/ScheduleTable'
const Schedule = props => {
  return (
    <div className={classes.schedule}>
      <h5>Demon Slayer</h5>
      <ScheduleTable />
    </div>
  )
}
export default Schedule
