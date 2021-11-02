import { Fragment, useState } from 'react'
import classes from './Card.module.css'
import Modal from '../UI/Modal'

import { useDispatch } from 'react-redux'
import { replaceId, resetTime } from '../../store/reducer/FilmsUI'
import TicketConfilm from './TicketConfilm'
import { useHistory } from 'react-router'

const Card = props => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const closeModalHandler = () => {
    setOpenModal(false)
  }
  const openModalHandler = () => {
    setOpenModal(true)
    dispatch(resetTime())
    dispatch(replaceId({ filmId: props.filmId }))
  }
  const gotoDetailPageHandler = e => {
    e.stopPropagation()
    dispatch(replaceId({ filmId: props.filmId, isComming: !!props.comming }))
    history.push('/film-detail')
  }
  let comming = (
    <div className={classes.calendar}>
      <button className={classes.calendarIcon} onClick={gotoDetailPageHandler}>
        chi tiết
      </button>
      <button className={classes.calendarDay} onClick={openModalHandler}>
        {props.calendar}
      </button>
    </div>
  )
  if (props.comming) {
    comming = (
      <div className={classes.commingSoonButton}>
        <button>{props.calendar}</button>
      </div>
    )
  }
  return (
    <Fragment>
      {openModal && (
        <Modal onClose={closeModalHandler}>
          <TicketConfilm closed={closeModalHandler} />
        </Modal>
      )}
      <div className={classes.cards}>
        <div
          className={classes.card}
          style={{ backgroundImage: `url(${props.poster})` }}
          onClick={!props.comming ? openModalHandler : gotoDetailPageHandler}
        >
          {comming}
        </div>
        <div className={classes.cardContent}>
          <div className={classes.title}>
            <h5>{props.name}</h5>
          </div>
          <p>{props.time} phút</p>
          <span>{props.type}</span>
        </div>
      </div>
    </Fragment>
  )
}
export default Card
