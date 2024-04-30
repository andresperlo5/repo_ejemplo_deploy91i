import '../css/ImgC.css'

const ImgC = ({url, alt, width, idComponent}) => {
  return (
    <>
     <img src={url} alt={alt} width={width} />
    </>
  )
}

export default ImgC