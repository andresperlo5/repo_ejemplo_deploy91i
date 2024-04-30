import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CardsC from '../components/CardsC'
import clienteAxios from '../helpers/clientAxios'

const UserPage = () => {
  const [products, setProducts] = useState([])

  const getAllProducts = async () => {
    try {
      const getProduct = await clienteAxios.get('/products')
      setProducts(getProduct.data.getAllProducts)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <>
      <Container className='mt-5'>
        <Row>
          {
            products.map((product) =>
              <Col sm={12} md={6} lg={4} key={product._id}>
                <CardsC url={product.imagen} titulo={product.titulo} descripcion={product.precio} idProduct={product._id} />
              </Col>
            )
          }
        </Row>
      </Container>
    </>
  )
}

export default UserPage