import classes from './TicketContent.module.css'
import ScheduleTable from '../../../../UI/ScheduleTable/ScheduleTable'
const TicketContent = props => {
  return (
    <div className={classes.contentTicket}>
      <div className={classes.content}>
        <h5>{props.film[0].name}</h5>
        <ScheduleTable film={props.film} />
      </div>
    </div>
  )
}
export default TicketContent
