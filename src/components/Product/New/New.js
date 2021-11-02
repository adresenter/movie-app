import HeaderTitle from '../../UI/HeaderTitle'
import classes from './New.module.css'
import NewContent from './NewContent'
const New = () => {
  return (
    <div className={classes.new}>
      <HeaderTitle name='tin tức' />
      <div className={classes.newContent}>
        <NewContent />
        <NewContent />
        <NewContent />
        <NewContent />
      </div>
    </div>
  )
}
export default New
