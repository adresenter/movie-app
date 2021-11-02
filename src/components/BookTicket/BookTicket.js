import React, { useEffect } from 'react'
import classes from './BookTicket.module.css'
import Day from '../UI/Day'
import Seat from './Seat'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../UI/Button'
import SeatStatus from '../UI/SeatStatus'
import OrderFilm from './OrderFilm'
import { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { changeTime } from '../../store/reducer/FilmsUI'
import Loading from '../UI/Loading'

const BookTicket = () => {
  //khởi tạo state,dispatch
  const [isLoading, setIsLoading] = useState(false)
  const [order, setOrder] = useState(false)
  const dispatch = useDispatch()

  //lấy state từ redux
  const filmsState = useSelector(state => state)
  // l
  //kiểm tra xem có đặt chỗ không , nếu không sẽ quay lại chọn chỗ
  const timeActive = filmsState.filmsUI.time
  useEffect(() => {
    if (timeActive.seat && timeActive.seat.length > 0) {
      return
    }
    setOrder(false)
  }, [timeActive])
  // lấy đúng film từ data
  const film = filmsState.films.films.filter(
    film => film.id === filmsState.filmsUI.filmIdCurrent
  )

  //lấy time đã chọn
  const calendar = film[0].calendar.slice().sort((a, b) => {
    return +a.day - +b.day
  })
  // khởi tạo type , time , day

  const buttonFormat = []
  let times = []
  //button có được active hay không
  const buttonActive = timeActive.seat && timeActive.seat.length > 0
  //các funtion
  const orderHandler = () => {
    setOrder(true)
  }
  const hiddenOrderHandler = () => {
    setOrder(false)
  }
  const changeTimeActiveHandler = type => {
    dispatch(changeTime({ calendar, type, timeActive }))
  }

  const days = calendar.map(day => {
    if (day.day === timeActive.day) {
      for (let item in day) {
        if (!day[item].status) {
          continue
        }
        //khởi tạo button type
        buttonFormat.push(
          <Button
            name={item}
            key={item}
            active={timeActive.type === item}
            clicked={changeTimeActiveHandler.bind(null, {
              type: 'type',
              value: item,
            })}
          />
        )
        //khởi tạo time
        if (timeActive.type === item) {
          times = day[item].schedule.map(time => {
            return (
              <p
                key={time}
                style={{
                  color: `${time === timeActive.time ? '#ff2c1f' : ''}`,
                  cursor: 'pointer',
                }}
                onClick={changeTimeActiveHandler.bind(null, {
                  type: 'time',
                  value: time,
                })}
              >
                {time}
              </p>
            )
          })
        }
      }
    }
    return (
      <Day
        key={day.day}
        day={day.day}
        active={day.day === timeActive.day}
        clicked={changeTimeActiveHandler.bind(null, {
          type: 'day',
          value: day.day,
        })}
      />
    )
  }) //khởi tạo chỗ ngồi
  let seatActive = []
  for (let key in film[0].choosed) {
    const seatChoosed = key.split('-')
    const isTime =
      seatChoosed[0] === timeActive.type &&
      seatChoosed[1] === timeActive.day &&
      seatChoosed[2] === timeActive.time
    if (isTime) seatActive = film[0].choosed[key].seat
  }

  const seats = filmsState.seat.map(seat => (
    <Seat
      key={seat.row}
      seats={seat}
      time={timeActive}
      seatActive={seatActive}
    />
  ))
  //loading
  const loadingPageHandler = () => {
    setIsLoading(prevState => !prevState)
  }
  const content = (
    <div className={classes.bookTicket}>
      <div
        className={`${classes.img} ${order ? classes.imgHidden : ''}`}
        style={{ backgroundImage: `url(${film[0].poster})` }}
      ></div>
      <div
        className={`${classes.content} ${order ? classes.contentHidden : ''}`}
      >
        <div className={classes.format}>{buttonFormat}</div>
        <div className={classes.schedule}>
          <h6>tháng 10</h6>
          <div className={classes.day}>{days}</div>
        </div>
        <div className={classes.times}>
          <h6>time</h6>
          <div className={classes.time}>{times}</div>
        </div>
        <div className={classes.seats}>
          {seats}
          <div className={classes.seatStatus}>
            <SeatStatus name='ghế chưa chọn' color='#3a3a3a' />
            <SeatStatus name='ghế Đã chọn' color='white' />
            <SeatStatus name='ghế bạn chọn' color='#ff2c1f' />
          </div>
          <div className={classes.button}>
            <Button
              name='đặt vé'
              active={buttonActive}
              clicked={buttonActive ? orderHandler : () => {}}
            />
          </div>
        </div>
      </div>
      <div className={`${classes.order} ${order ? classes.orderHidden : ''}`}>
        <div className={classes.hiddenOrder} onClick={hiddenOrderHandler}>
          <IoClose />
        </div>
        <OrderFilm
          confirmTicket={timeActive}
          onLoading={loadingPageHandler}
          film={film}
        />
      </div>
    </div>
  )
  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className={classes.container}>
          <div className={classes.bookTicketContainer}>{content}</div>
        </div>
      )}
    </>
  )
}
export default BookTicket
