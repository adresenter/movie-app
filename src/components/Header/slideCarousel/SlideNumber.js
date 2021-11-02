import classes from './SlideNumber.module.css'
const NumberCarousel = props => {
  const classesActive = props.id === props.active ? `${classes.active}` : ''
  return (
    <span
      onClick={props.clicked.bind(null, props.id)}
      className={`${classes.number} ${classesActive}`}
    >{`0${props.id + 1}`}</span>
  )
}
export default NumberCarousel
