import classes from './User.module.css'
import backgroundImage from '../../assets/cinema.jpg'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../store/reducer/AuthReducer'
import { userInfoChange } from '../../store/reducer/FilmsUI'
import { useHistory } from 'react-router'
import Loading from '../UI/Loading'
const User = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const history = useHistory()
  const emailRef = useRef()
  const passwordRef = useRef()

  const dispatch = useDispatch()
  const loginAccount = async (enteredEmail, enteredPassword) => {
    setIsLoading(true)
    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyADVk55I7aihW7bnv7Qae1aIu47PT5HEhE',
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error.message)
      }
      dispatch(login({ localId: data.localId, email: enteredEmail }))
      dispatch(userInfoChange(true))
      setIsLoading(false)
      history.push('/')
    } catch (err) {
      setIsLoading(false)
      setIsValid(true)
      setErrorMsg('tài khoản hoặc mật khẩu không đúng')
    }
  }
  const createAccount = async (enteredEmail, enteredPassword) => {
    setIsLoading(true)

    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyADVk55I7aihW7bnv7Qae1aIu47PT5HEhE',
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: { 'Content-Type': 'application/json' },
        }
      )
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error.message)
      }
      loginAccount(enteredEmail, enteredPassword)
    } catch (err) {
      let errorMessage = 'create account failed!'
      if (err) {
        errorMessage = err
      }
      alert(errorMessage)
    }
  }
  const blurInputHandler = e => {
    if (!e.target.value) {
      e.target.classList.add(`${classes.valid}`)
      return
    }
    e.target.classList.remove(`${classes.valid}`)
  }
  const formSubmitHandler = e => {
    e.preventDefault()
    const enteredEmail = emailRef.current.value
    const enteredPassword = passwordRef.current.value
    if (!enteredPassword || !enteredEmail) {
      !enteredPassword && passwordRef.current.classList.add(`${classes.valid}`)
      !enteredEmail && emailRef.current.classList.add(`${classes.valid}`)
      setIsValid(true)
      setErrorMsg('vui lòng nhập đầy đủ thông tin')
      return
    } else {
      !enteredPassword &&
        passwordRef.current.classList.remove(`${classes.valid}`)
      !enteredEmail && emailRef.current.classList.remove(`${classes.valid}`)
      setIsValid(false)
      setErrorMsg('')
    }

    if (!isLogin && !isValid) {
      createAccount(enteredEmail, enteredPassword)
      return
    }
    if (isLogin && !isValid) {
      loginAccount(enteredEmail, enteredPassword)
      return
    }
  }
  const changeFormHandler = () => {
    setIsLogin(prevState => !prevState)
  }
  if (isLoading) {
    return <Loading />
  }
  return (
    <div className={classes.user}>
      <div className={classes.content}>
        <div
          className={classes.img}
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        ></div>
        <div className={classes.login}>
          <div className={classes.loginForm}>
            <h5>{isLogin ? 'đăng nhập' : 'đăng ký'}</h5>
            <form onSubmit={formSubmitHandler}>
              <label htmlFor='email'>Email:</label>
              <input
                id='email'
                type='email'
                placeholder='nhập Email'
                ref={emailRef}
                onBlur={blurInputHandler}
              />
              <label htmlFor='password'>mật khẩu:</label>
              <input
                id='password'
                type='password'
                placeholder='nhập mật khẩu'
                ref={passwordRef}
                onBlur={blurInputHandler}
              />
              <button type='submit'>{isLogin ? 'đăng nhập' : 'đăng ký'}</button>
              {isValid && <p className={classes.errorMsg}>{errorMsg}</p>}
              <p onClick={changeFormHandler}>
                {isLogin ? 'bạn chưa có tài khoản?' : 'đăng nhập vào website'}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default User
