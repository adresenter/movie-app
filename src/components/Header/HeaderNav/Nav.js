import classes from './Nav.module.css'
import { NavLink } from 'react-router-dom'
import { ImUser } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../store/reducer/AuthReducer'

const Nav = props => {
  const authState = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }
  const accountContent = (
    <div className={classes.account}>
      <div className={classes.accountLogo}>
        <ImUser size='32px' />
      </div>
      <div className={classes.accountContent}>
        <NavLink to='/profile'>Thông Tin</NavLink>
        <p onClick={logoutHandler}>Đăng Xuất</p>
      </div>
    </div>
  )
  return (
    <ul
      className={`${props.bars ? classes.navBars : classes.nav} ${
        props.hidden && classes.hidden
      }`}
    >
      {authState.isLoggedIn && props.bars && (
        <li className={classes.name}>xin chào {authState.email}</li>
      )}
      <li>
        <NavLink
          to='/'
          exact
          onClick={props.clicked}
          activeClassName={classes.active}
        >
          Trang Chủ
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/now-showing'
          onClick={props.clicked}
          activeClassName={classes.active}
        >
          Phim Đang Chiếu
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/comming-soon'
          onClick={props.clicked}
          activeClassName={classes.active}
        >
          Phim Sắp Chiếu
        </NavLink>
      </li>
      <li
        className={
          props.bars ? (authState.isLoggedIn ? classes.hiddenAccount : '') : ''
        }
      >
        {!authState.isLoggedIn && (
          <NavLink
            to='/account'
            onClick={props.clicked}
            activeClassName={classes.active}
          >
            Thành Viên
          </NavLink>
        )}
        {authState.isLoggedIn && accountContent}
      </li>
      {authState.isLoggedIn && props.bars && (
        <>
          <li>
            <NavLink
              to='/profile'
              onClick={props.clicked}
              activeClassName={classes.active}
            >
              thông tin
            </NavLink>
          </li>
          <li className={classes.logout} onClick={logoutHandler}>
            đăng xuất
          </li>
        </>
      )}
    </ul>
  )
}
export default Nav
