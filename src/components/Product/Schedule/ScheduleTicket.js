import HeaderTitle from '../../UI/HeaderTitle'
import classes from './ScheduleTicket.module.css'
import Ticket from './Ticket/Ticket'

const ScheduleTicket = props => {
  return (
    <div className={classes.schedule}>
      <HeaderTitle name='lịch chiếu' />
      <div className={classes.ticketBox}>
        <Ticket />
      </div>
    </div>
  )
}
export default ScheduleTicket
