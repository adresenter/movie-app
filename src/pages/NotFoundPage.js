const NotFoundPage = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#1f1f1f',
        padding: '30px 0',
      }}
    >
      <div
        style={{
          width: '1200px',
          height: '500px',
          background: 'black',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '10px',
        }}
      >
        <h5 style={{ margin: '0', fontSize: '30px' }}>không tìm thấy trang</h5>
      </div>
    </div>
  )
}
export default NotFoundPage
