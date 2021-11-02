import classes from './NewContent.module.css'
const NewContent = () => {
  return (
    <div className={classes.contents}>
      <div className={classes.img}>
        <img
          alt=''
          src='https://znews-photo.zadn.vn/w1920/Uploaded/ngogtn/2021_08_12/Venom.jpg'
        />
      </div>
      <div className={classes.content}>
        <h6>Tom Hardy muốn Venom đối đầu Spider-Man</h6>
        <p>
          Nam diễn viên Tom Hardy khẳng định anh sẽ “làm mọi thứ có thể” để đưa
          Venom và Spider-Man (Tom Holland) đối đầu trên màn ảnh.
        </p>
      </div>
    </div>
  )
}
export default NewContent
