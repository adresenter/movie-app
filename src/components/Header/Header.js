import Nav from './HeaderNav/Nav'
import Logo from './logo/Logo'
import classes from './Header.module.css'
import SlideCarousel from './slideCarousel/SlideCarousel'
import SlideNumber from './slideCarousel/SlideNumber'

import { AiOutlineClose } from 'react-icons/ai'

import { FaBars } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'

const Header = () => {
  const [isHome, setIsHome] = useState(true)
  const [bars, setBars] = useState(false)
  const filmsState = useSelector(state => state.films.films)
  const [slideActive, setSlideActive] = useState(0)
  const [hidden, setHidden] = useState(false)
  const location = useLocation()
  const pathname = location.pathname
  const showBarHandler = () => {
    if (window.innerWidth <= 1024) {
      setBars(true)
    } else {
      setBars(false)
    }
  }
  useEffect(() => {
    showBarHandler()
    if (pathname === '/') {
      setIsHome(true)
      return
    }
    setIsHome(false)
  }, [pathname])

  const films = filmsState.slice(0, 4)
  const activeSlideHandler = id => {
    setSlideActive(id)
  }
  const Slides = films.map((film, id) => {
    return (
      <SlideCarousel
        key={film.id}
        name={film.name}
        content={film.content}
        img={film.img}
        active={slideActive}
        id={id}
        filmId={film.id}
      />
    )
  })
  const SlidesNumber = films.map((slide, id) => {
    return (
      <SlideNumber
        active={slideActive}
        id={id}
        key={slide.id}
        clicked={activeSlideHandler}
      />
    )
  })
  const hiddenNavHandler = () => {
    setHidden(prevState => !prevState)
  }
  window.addEventListener('resize', showBarHandler)

  return (
    <header className={`${isHome ? classes.header : classes.headerBooking}`}>
      <div className={`${classes.nav} `}>
        <div className={classes.navContent}>
          <Logo />
          {bars ? (
            hidden ? (
              <AiOutlineClose
                color='white'
                size='30px'
                onClick={hiddenNavHandler}
                className={classes.bars}
              />
            ) : (
              <FaBars
                color='white'
                size='26px'
                onClick={hiddenNavHandler}
                className={classes.bars}
              />
            )
          ) : (
            <Nav />
          )}
        </div>
        {bars && <Nav clicked={hiddenNavHandler} bars hidden={hidden} />}
      </div>
      {isHome && (
        <div className={classes.carouselContainer}>
          <div className={classes.carousel}>{Slides}</div>{' '}
          <div className={classes.slideNumber}>{SlidesNumber}</div>
        </div>
      )}
    </header>
  )
}
export default Header
