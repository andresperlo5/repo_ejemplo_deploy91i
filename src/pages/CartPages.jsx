import { useEffect, useState } from 'react'
import clienteAxios, { config } from '../helpers/clientAxios'
import Table from 'react-bootstrap/Table';

const CartPages = () => {
  const [productsCart, setProductCart] = useState([])

  const getAllProductsCart = async () => {
    try {
      const idUsuario = JSON.parse(sessionStorage.getItem('idUsuario'))
      const dataUser = await clienteAxios.get(`/users/${idUsuario}`, config)

      if (dataUser.status === 200) {
        const productsCart = await clienteAxios.get(`/carts/${dataUser.data.getUser.idCart}`, config)
        setProductCart(productsCart.data.products)
      }

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getAllProductsCart()
  }, [])


  return (
    <>
    <div className='d-flex justify-content-center my-5'>
    <Table striped bordered hover size="sm" className='w-50'>
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Titulo</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {
            productsCart.map((product) =>
              <tr key={product._id}>
                <td>{product.codigo}</td>
                <td>{product.titulo}</td>
                <td>{product.precio}</td>
                <td><input type='number' className='w-25'/></td>
                <td>
                  <span>Total</span>
                </td>

              </tr>
            )
          }
        </tbody>
      </Table>
    </div>
    </>
  )
}

export default CartPages