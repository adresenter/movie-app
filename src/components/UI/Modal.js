import { Fragment } from 'react'
import ReactDOM from 'react-dom'

import classes from './Modal.module.css'

const BackDrop = props => {
  return <div className={classes.backdrop} onClick={props.onClose} />
}
const ModalOverlay = props => {
  const trailer = props.trailer ? classes.trailer : ''

  return (
    <div
      className={`${classes.modal} ${
        props.trailer ? classes.modalTrailer : ''
      } `}
      onClick={props.onClose}
    >
      <div
        className={`${classes.modalContent} ${trailer}`}
        onClick={e => e.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
  )
}
const portalElement = document.getElementById('overlay')
const Modal = props => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <BackDrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          trailer={props.trailer}
          onClick={props.onClick}
          onClose={props.onClose}
        >
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </Fragment>
  )
}

export default Modal
