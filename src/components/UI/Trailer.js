import classes from './Trailer.module.css'
import { BsPlayFill } from 'react-icons/bs'
import { useState } from 'react'
const Trailer = props => {
  const [isPlayIcon, setIsPlayIcon] = useState(false)

  const openPlayIconHandler = () => {
    setIsPlayIcon(true)
  }
  const closePlayIconHandler = () => {
    setIsPlayIcon(false)
  }

  return (
    <div
      className={`${classes.trailer} `}
      onMouseEnter={openPlayIconHandler}
      onMouseLeave={closePlayIconHandler}
      onClick={props.hidden.bind(null, props.trailerId)}
    >
      <div className={classes.trailerContent}>
        <img
          className={classes.trailerImg}
          alt=''
          src={`https://img.youtube.com/vi/${props.trailerId}/mqdefault.jpg`}
        />
        {isPlayIcon && (
          <>
            <div className={classes.underline}></div>
            <BsPlayFill className={classes.playIcon} />
          </>
        )}
      </div>
    </div>
  )
}
export default Trailer
