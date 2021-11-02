import classes from './Button.module.css'
const Button = props => {
  const color = props.active ? '#ff2c1f' : '#1f1f1f'
  return (
    <button
      style={{ backgroundColor: `${color}` }}
      className={`${classes.button}`}
      onClick={props.clicked}
    >
      {props.name}
    </button>
  )
}
export default Button
