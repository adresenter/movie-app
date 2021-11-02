import classes from './PageUI.module.css'

const PageUI = props => {
  return (
    <div className={classes.pageUI}>
      <div className={classes.content}>{props.children}</div>
    </div>
  )
}
export default PageUI
