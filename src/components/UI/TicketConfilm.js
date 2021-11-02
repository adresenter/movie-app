import classes from './TicketConfilm.module.css'
import Ticket from '../Product/Schedule/Ticket/Ticket'
import ScheduleList from '../Product/Schedule/ScheduleList/ScheduleList'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import useReSize from '../../hooks/useReSize'
import { useEffect, useState } from 'react'
import TicketRes from './TicketRes'
const TicketConfilm = props => {
  const [ticketRes, setTicketRes] = useState(false)

  const filmBookingState = useSelector(state => state.filmsUI.time)
  const authState = useSelector(state => state.auth)

  const history = useHistory()
  const size = useReSize([], size => size)

  useEffect(() => {
    if (size < 1024 + 18 && !ticketRes) {
      setTicketRes(true)
      return
    }
    if (size > 1024 + 18 && ticketRes) {
      setTicketRes(false)
      return
    }
  }, [size, ticketRes])

  const bookTicketHandler = () => {
    if (!filmBookingState.time) return
    if (!authState.isLoggedIn) {
      history.push('/account')
      return
    }
    props.closed()
    history.push({ pathname: 'book-ticket' })
  }

  return (
    <>
      <div className={classes.changeStyte}>
        <div className={classes.ticket}>
          {!ticketRes ? <Ticket /> : <TicketRes size={size} />}
        </div>
        <ScheduleList />
      </div>
      <div
        className={`${classes.button} ${
          filmBookingState.time ? classes.active : ''
        }`}
      >
        <button onClick={bookTicketHandler}>đặt vé</button>
      </div>
    </>
  )
}
export default TicketConfilm
