import classes from './Detail.module.css'
import { useSelector } from 'react-redux'
import imdb from '../../assets/imdb.png'
import Trailer from '../UI/Trailer'
import { useState } from 'react'
import Modal from '../UI/Modal'
import ReactPlayer from 'react-player'
import Loading from '../UI/Loading'
import useReSize from '../../hooks/useReSize'
import { useEffect } from 'react'
import TicketConfilm from '../UI/TicketConfilm'
const Detail = () => {
  const [hiddenTrailer, setHiddenTrailer] = useState(false)
  const [trailerId, setTrailerId] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [sizeTrailer, setSizeTrailer] = useState({
    width: '1000px',
    height: '550px',
  })
  const filmState = useSelector(state => state)
  const size = useReSize([], s => s)
  useEffect(() => {
    if (size >= 1200) {
      setSizeTrailer({ width: '1000px', height: '550px' })
      return
    }
    if (size >= 1024) {
      setSizeTrailer({ width: '840px', height: '550px' })
      return
    }
    if (size >= 960) {
      setSizeTrailer({ width: '830px', height: '550px' })
      return
    }
    if (size >= 810) {
      setSizeTrailer({ width: '750px', height: '450px' })
      return
    }
    if (size >= 768) {
      setSizeTrailer({ width: '550px', height: '450px' })
      return
    }
    if (size >= 600) {
      setSizeTrailer({ width: '100%', height: '350px' })
      return
    }
    if (size >= 576) {
      setSizeTrailer({ width: '450px', height: '350px' })
      return
    }
    if (size >= 450) {
      setSizeTrailer({ width: '380px', height: '300px' })
      return
    }
    if (size >= 400) {
      setSizeTrailer({ width: '300px', height: '220px' })
      return
    }
  }, [size])
  let filmCurrent = []
  filmCurrent = filmState.films.films.filter(film => {
    return film.id === filmState.filmsUI.filmIdCurrent
  })
  if (filmState.filmsUI.isComming) {
    filmCurrent = filmState.films.commingSoon.filter(film => {
      return film.id === filmState.filmsUI.filmIdCurrent
    })
  }
  if (filmCurrent.length === 0) return <Loading />

  const types = filmCurrent[0].type.split(',')
  const type = types.map((t, i) => {
    return <p key={i}>{t}</p>
  })
  const openModalBookingHandler = () => {
    setOpenModal(true)
  }
  const closeModalBookingHandler = () => {
    setOpenModal(false)
  }
  const closeModalHandler = () => {
    setHiddenTrailer(false)
  }
  const hiddenTrailerHandler = trailerId => {
    setTrailerId(trailerId)
    setHiddenTrailer(true)
  }
  const trailers = filmCurrent[0].trailerId.map((trailer, i) => {
    return <Trailer key={i} trailerId={trailer} hidden={hiddenTrailerHandler} />
  })
  return (
    <>
      {hiddenTrailer && (
        <Modal trailer onClose={closeModalHandler}>
          <ReactPlayer
            className={classes.trailer}
            controls
            playing={true}
            width={sizeTrailer.width}
            height={sizeTrailer.height}
            url={`https://www.youtube.com/watch?v=${trailerId}`}
          />
        </Modal>
      )}
      {openModal && (
        <Modal onClose={closeModalBookingHandler}>
          <TicketConfilm closed={closeModalBookingHandler} />
        </Modal>
      )}
      <div className={classes.detail}>
        <div
          className={classes.filmPoster}
          style={{ backgroundImage: `url(${filmCurrent[0].img})` }}
        ></div>
        <div className={classes.filmDetailContainer}>
          <div
            className={`${classes.filmDetail} ${
              size < 768 ? classes.filmDetailRes : ''
            }`}
          >
            <div className={classes.posterContent}>
              <img
                className={classes.poster}
                alt=''
                src={`${filmCurrent[0].poster}`}
              />
              {!filmState.filmsUI.isComming && (
                <button onClick={openModalBookingHandler}>đặt vé</button>
              )}
            </div>
            <div className={classes.filmName}>
              <h3>{filmCurrent[0].name}</h3>
              <p>{filmCurrent[0].time} phút </p>
              <div className={classes.imdb}>
                <img className={classes.imdbIcon} alt='' src={`${imdb}`} />
                <span>{filmCurrent[0].imdb}</span>
              </div>
              <div className={classes.type}>{type}</div>
              <div className={classes.filmContent}>
                <h5>nội dung</h5>
                <p>{filmCurrent[0].content}</p>
                <h5>trailer</h5>
                <div className={classes.trailers}>{trailers}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Detail
