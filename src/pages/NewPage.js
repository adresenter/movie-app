import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import FilmItems from '../components/Product/FilmItem/FilmItems'

import PageUI from '../components/UI/PageUI'

const NewPage = () => {
  const filmsState = useSelector(state => state.films.films)
  return (
    <Fragment>
      <PageUI>
        <FilmItems films={filmsState} />
      </PageUI>
    </Fragment>
  )
}
export default NewPage
