import './App.css'

import { Fragment, useCallback, useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import { replaceFilm, replaceCommingSoon } from './store/reducer/FilmsReducer'
import { getUserInfo } from './store/reducer/AuthReducer'

import HomePage from './pages/HomePage'
import Layout from './components/Layout/Layout'
import BookTicketPage from './pages/BookTicketPage'
import UserPage from './pages/UserPage'
import NewPage from './pages/NewPage'
import CommingSoonPage from './pages/CommingSoonPage'
import ProfilePage from './pages/ProfilePage'
import DetailPage from './pages/DetailPage'
import { userInfoChange } from './store/reducer/FilmsUI'
import NotFoundPage from './pages/NotFoundPage'
//lấy dữ liệu đúng 1 lần
let initialStart = true
function App() {
  //khởi tạo giá trị ban đầu
  const dispatch = useDispatch()
  const filmsState = useSelector(state => state)
  const location = useLocation()
  const pathName = location.pathname
  const changeUserInfo = filmsState.filmsUI.isSendData
  const localId = filmsState.auth.localId
  // hàm lấy dữ liệu film đang chiếu và sắp chiếu
  const getDataUser = useCallback(async () => {
    try {
      const response = await fetch(
        `https://movie-eccc4-default-rtdb.firebaseio.com/ticket/${localId}.json`
      )
      if (!response.ok) {
        throw new Error('có lỗi xảy ra')
      }
      const data = await response.json()
      dispatch(getUserInfo(data))
      dispatch(userInfoChange(false))
    } catch (err) {
      alert(err)
    }
  }, [dispatch, localId])
  const getDataFilm = useCallback(async () => {
    //khởi tạo các api
    const apiURL = [
      'https://movie-eccc4-default-rtdb.firebaseio.com/films.json',
      'https://movie-eccc4-default-rtdb.firebaseio.com/commingsoon.json',
    ]
    //request server để lấy api
    const data = await Promise.all(
      apiURL.map(async url => {
        const response = await fetch(url)
        return await response.json()
      })
    )
    //gửi data film vào redux
    dispatch(replaceFilm(data[0]))
    dispatch(replaceCommingSoon(data[1]))
  }, [dispatch])
  // hàm lấy dữ liệu user

  useEffect(() => {
    if (initialStart) {
      initialStart = false
      getDataUser()
      getDataFilm()
    }
    if (changeUserInfo) {
      getDataFilm()
      getDataUser()
    }
    if (pathName === '/' || pathName === '/trang-chu') {
      localStorage.removeItem('filmId')
    }
  }, [getDataFilm, pathName, dispatch, getDataUser, changeUserInfo])
  return (
    <Fragment>
      <Layout>
        <Switch>
          <Route path='/' exact>
            <HomePage />
          </Route>
          <Route path='/trang-chu'>
            <HomePage />
          </Route>
          <Route path='/now-showing'>
            <NewPage />
          </Route>
          <Route path='/comming-soon'>
            <CommingSoonPage />
          </Route>
          <Route path='/book-ticket'>
            <BookTicketPage />
            {/* {localId ? <BookTicketPage /> : <HomePage />} */}
          </Route>
          <Route path='/account'>
            <UserPage />
          </Route>
          <Route path='/Profile'>
            <ProfilePage />
            {/* {localId ? <ProfilePage /> : <HomePage />} */}
          </Route>
          <Route path='/film-detail'>
            <DetailPage />
          </Route>
          <Route path='*'>
            <NotFoundPage />
          </Route>
        </Switch>
      </Layout>
    </Fragment>
  )
}

export default App
