import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import TicketPoster from '../Product/Schedule/Ticket/TicketPoster'
import Loading from '../UI/Loading'
import classes from './Profile.module.css'
const Profile = () => {
  const authState = useSelector(state => state.auth)
  const history = useHistory()
  const changeUserInfoState = useSelector(state => state.filmsUI.isSendData)
  const [isActive, setIsActive] = useState('')
  let userData = authState.userInfo

  useEffect(() => {
    if (userData.length > 0) {
      setIsActive(userData[0].id)
    }
  }, [userData])
  if (changeUserInfoState) {
    return <Loading />
  }
  if (userData.length === 0) {
    return (
      <div className={classes.profile}>
        <div className={classes.ticketContainer}>
          <p>bạn chưa đặt vé xem phim nào</p>
          <button
            onClick={() => {
              history.push('/')
            }}
          >
            đặt vé
          </button>
        </div>
      </div>
    )
  }
  const changeTicketHandler = id => {
    setIsActive(id)
  }
  const ticket = userData.map(tk => {
    return (
      <Fragment key={tk.id}>
        <div className={classes.ticketId}>
          <span onClick={changeTicketHandler.bind(null, tk.id)}>+</span>
          <p>Mã vé: {tk.id}</p>
        </div>
        <div
          className={`${classes.ticket} ${
            isActive === tk.id ? classes.ticketActive : ''
          }`}
        >
          <TicketPoster poster={tk.film.poster} />
          <div className={classes.ticketContent}>
            <div className={classes.content}>
              <h5>hm cinema</h5>
              <h5>{tk.film.name}</h5>
              <div className={classes.timeContent}>
                <div className={classes.time}>
                  <p>{tk.ticket.time.time}</p>
                  <p>{tk.ticket.time.day}</p>
                  <p>tháng 10</p>
                </div>
                <div className={classes.type}>
                  <p>{tk.ticket.time.type}</p>
                </div>
                <div className={classes.seat}>
                  <p>ghế:{tk.ticket.time.seat.join(',')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  })
  return (
    <div className={classes.profile}>
      {!changeUserInfoState && (
        <div className={classes.profileContent}>{ticket}</div>
      )}
    </div>
  )
}
export default Profile
