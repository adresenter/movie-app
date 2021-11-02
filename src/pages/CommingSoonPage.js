import { Fragment } from 'react'
import { useSelector } from 'react-redux'

import FilmItems from '../components/Product/FilmItem/FilmItems'
import PageUI from '../components/UI/PageUI'

const CommingSoonPage = () => {
  const filmsState = useSelector(state => state.films.commingSoon)
  return (
    <Fragment>
      <PageUI>
        <FilmItems films={filmsState} comming />
      </PageUI>
    </Fragment>
  )
}
export default CommingSoonPage
