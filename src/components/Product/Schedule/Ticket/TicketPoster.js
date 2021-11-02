import classes from './TicketPoster.module.css'
const TicketPoster = props => {
  return (
    <div className={classes.ticketPoster}>
      <div
        className={classes.poster}
        style={{ backgroundImage: `url(${props.poster})` }}
      ></div>
    </div>
  )
}
export default TicketPoster
