import classes from './SlideCarousel.module.css'
import Button from '../../UI/Button'
import { useDispatch } from 'react-redux'
import { Fragment, useState } from 'react'
import Modal from '../../UI/Modal'
import TicketConfilm from '../../UI/TicketConfilm'
import { replaceId, resetTime } from '../../../store/reducer/FilmsUI'
import { useHistory } from 'react-router'
const SlideCarousel = props => {
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  // const [openTrailer, setOpenTrailer] = useState(false)
  const history = useHistory()
  const closeModalHandler = () => {
    setOpenModal(false)
  }
  const openModalHandler = e => {
    dispatch(resetTime())
    setOpenModal(true)
    dispatch(replaceId({ filmId: props.filmId }))
  }
  const goToDetailPageHandler = () => {
    dispatch(replaceId({ filmId: props.filmId }))
    history.push('/film-detail')
  }
  const content = props.content.split(' ').slice(0, 45)
  const active = props.active === props.id ? `${classes.slideActive}` : ''
  return (
    <Fragment>
      {openModal && (
        <Modal onClose={closeModalHandler}>
          <TicketConfilm closed={closeModalHandler} />
        </Modal>
      )}

      <div className={`${classes.slideContainer} ${active}`}>
        <div className={classes.shadow}></div>
        <div className={classes.content}>
          <h4>{props.name}</h4>
          <p>
            {content.join(' ')}
            <span> Xem Thêm...</span>
          </p>
          <div className={classes.buttons}>
            <Button name='Đặt Vé' color='#ff2c1f' clicked={openModalHandler} />
            <Button
              name='chi tiết'
              color='#ff2c1f'
              clicked={goToDetailPageHandler}
            />
          </div>
        </div>
        <div
          className={classes.slideBackground}
          style={{ backgroundImage: `url(${props.img})` }}
        ></div>
      </div>
    </Fragment>
  )
}
export default SlideCarousel
