import Header from '../Header/Header'
import Footer from '../Product/Footer/Footer'
const Layout = props => {
  return (
    <main>
      <Header />
      {props.children}
      <Footer />
    </main>
  )
}
export default Layout
