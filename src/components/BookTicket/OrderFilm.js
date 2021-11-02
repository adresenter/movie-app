import classes from './OrderFilm.module.css'

import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import { userInfoChange } from '../../store/reducer/FilmsUI'

const OrderFilm = props => {
  //khởi tạo các giá trị ban đầu
  const authState = useSelector(state => state.auth.localId)
  const changeUserInfoState = useSelector(state => state.filmsUI.isSendData)

  const history = useHistory()
  const dispatch = useDispatch()
  const film = { ...props.film[0] }
  //khởi tạo ghế đã chọn
  if (!film.choosed) film.choosed = {}
  const seat =
    props.confirmTicket.seat &&
    props.confirmTicket.seat.map(s => s.split(' ').join(''))
  useEffect(() => {
    if (changeUserInfoState) {
      history.push('/profile')
    }
  }, [history, changeUserInfoState])
  //tính tổng số tiền
  const totalPrice = seat && seat.length * 105
  //hàm update data lên firebase
  const sendData = async () => {
    //khởi tạo time đặt vé dạng type-day-time
    const time = `${props.confirmTicket.type}-${props.confirmTicket.day}-${props.confirmTicket.time}`
    //khởi tạo ghế đã chọn để updata
    let seatChoosed = []
    //nếu chưa có thì khởi tạo

    if (!film.choosed[time]) {
      seatChoosed = props.confirmTicket.seat
    } else {
      //nếu có thì khởi thêm vào
      seatChoosed = film.choosed[time].seat
      props.confirmTicket.seat.forEach(item => {
        seatChoosed = Object.assign([], seatChoosed)
        seatChoosed.push(item)
      })
    }
    // tạo các requestApi
    const apiFetchs = [
      {
        url: `https://movie-eccc4-default-rtdb.firebaseio.com/ticket/${authState}.json`,
        method: 'POST',
        body: {
          ticket: {
            time: props.confirmTicket,
            totalPrice: totalPrice,
          },
          film: { ...film },
        },
      },
      {
        url: `https://movie-eccc4-default-rtdb.firebaseio.com/films/${film.name}/choosed/${time}.json`,
        method: 'PUT',
        body: {
          seat: seatChoosed,
        },
      },
    ]
    // chạy promise
    await Promise.all(
      apiFetchs.map(async fch => {
        const response = await fetch(fch.url, {
          method: fch.method,
          body: JSON.stringify(fch.body),
        })
        await response.json()
      })
    )

    //update userInfo data , để khỏi phải load
    dispatch(userInfoChange(true))
  }

  const submitFormHandler = e => {
    e.preventDefault()
    sendData()
  }

  return (
    <Fragment>
      <div className={classes.infoFilm}>
        <div
          className={classes.filmImg}
          style={{ backgroundImage: `url(${film.poster})` }}
        ></div>
        <div className={classes.filmInfo}>
          <h5>{film.name}</h5>
          <p className={classes.type}>{props.confirmTicket.type}</p>
          <p>ngày chiếu: {props.confirmTicket.day}/8</p>
          <p>Giờ Chiếu: {props.confirmTicket.time}</p>
          <p>ghế: {seat && seat.join(',')}</p>{' '}
        </div>
      </div>
      <form className={classes.form} onSubmit={submitFormHandler}>
        <textarea
          name='w3review'
          rows='6'
          cols='50'
          placeholder='yêu cầu khác'
        />
        <div className={classes.price}>
          <div>
            <span>số lượng:</span>
            <span className={classes.priceInfo}>{seat && seat.length}</span>
          </div>
          <div>
            <span>giá vé:</span>
            <span className={classes.priceInfo}>105.000đ</span>
          </div>
        </div>
        <h4>tổng : {seat && seat.length * 105}.000đ</h4>
        <div className={classes.button}>
          <button type='submit'>Xác Nhận</button>
        </div>
      </form>
      <div className={classes.footer}>
        <p>hm cinema hân hạnh được phục vụ bạn</p>
      </div>
    </Fragment>
  )
}
export default OrderFilm
