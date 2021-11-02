import Logo from '../../Header/logo/Logo'
import classes from './Footer.module.css'
const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.footerContent}>
        <div className={classes.logo}>
          <Logo />
        </div>
        <div className={classes.nav}>
          <ul>
            <li>Trang Chủ</li>
            <li>Phim Đang Chiếu</li>
            <li>Phim Sắp chiếu</li>
          </ul>
        </div>
        <div className={classes.title}>
          <p>
            Âm thanh 5.1 (6 channel) thay vì stereo (2 channel) như các trang
            phim khác (kể cả Youtube)
          </p>
          <p>
            Phù hợp để xem trên màn hình TV, máy tính, laptop có độ phân giải
            cao
          </p>
        </div>
        <div className={classes.contact}>
          <p>Liên Hệ:</p>
          <p>hoangminh199524@gmail.com</p>
        </div>
      </div>
    </div>
  )
}
export default Footer
