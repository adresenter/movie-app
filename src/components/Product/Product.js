import { Fragment } from 'react'
import classes from './Product.module.css'
import NowShowing from './NowShowing/NowShowing'
import CommingSoon from './CommingSoon/CommingSoon'

import poster6 from '../../assets/poster6.jpg'
import New from './New/New'

const Product = () => {
  return (
    <Fragment>
      <div
        className={classes.product}
        style={{ backgroundImage: `url(${poster6})` }}
      >
        <div className={classes.content}>
          <NowShowing />
          <CommingSoon />
        </div>
        <div className={classes.new}>
          <New />
        </div>
      </div>
    </Fragment>
  )
}
export default Product
