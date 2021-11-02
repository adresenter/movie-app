import { useHistory } from 'react-router'
import classes from './HeaderTitle.module.css'
const HeaderTitle = props => {
  const history = useHistory()
  const goToPageHandler = () => {
    history.replace(props.now ? '/now-showing' : 'comming-soon')
  }
  return (
    <div className={classes.headerTitle}>
      <h4>{props.name}</h4>
      <p onClick={goToPageHandler}>more...</p>
    </div>
  )
}
export default HeaderTitle
