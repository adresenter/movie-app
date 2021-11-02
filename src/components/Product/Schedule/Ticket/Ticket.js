import TicketContent from './TicketContent/TicketContent'
import TicketPoster from './TicketPoster'
import classes from './Ticket.module.css'

import { useSelector } from 'react-redux'
const Ticket = props => {
  const filmsState = useSelector(state => state.films.films)
  const filmIdCurrentState = useSelector(state => state.filmsUI.filmIdCurrent)
  const film = filmsState.filter(film => film.id === filmIdCurrentState)
  return (
    <div className={classes.ticket}>
      <TicketPoster poster={film[0].poster} />
      <TicketContent film={film} />
    </div>
  )
}
export default Ticket
