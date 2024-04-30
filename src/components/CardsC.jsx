import Card from 'react-bootstrap/Card';
import '../css/CardsC.css'
import { Link } from 'react-router-dom';
import clienteAxios from '../helpers/clientAxios';
import Swal from 'sweetalert2';

const CardsC = ({ url, titulo, descripcion, idProduct, idPage }) => {

  const deleteProdFav = async () => {
    const idUsuario = JSON.parse(sessionStorage.getItem('idUsuario'))
    const dataUser = await clienteAxios.get(`/users/${idUsuario}`)

    if (dataUser.status === 200) {
      const confirmDeletedProd = confirm('Estas seguro de que quieres eliminar este producto?')

      if (confirmDeletedProd) {
        const productsFav = await clienteAxios.delete(`/favs/${dataUser.data.getUser.idFav}/${idProduct}`)

        if (productsFav.status === 200) {
          Swal.fire({
            title: "Producto eliminado correctamente!",
            icon: "success"
          });
        }
      }

    }
  }

  return (
    <>
      <Card className='my-3 img-cards-css'>
        <Card.Img variant="top" src={url} />
        <Card.Body>
          <Card.Title>{titulo}</Card.Title>
          <Card.Text>
            {descripcion}
          </Card.Text>
          {
            idPage === 'FavPage' ?
              <Link to={'#'} className='btn btn-danger' onClick={deleteProdFav}>Eliminar</Link>
              :
              <Link to={`/product/${idProduct}`} className='btn btn-success'>Ver Mas</Link>
          }

        </Card.Body>
      </Card>

    </>
  )
}

export default CardsC