import React, { useEffect, useState } from 'react'
import ImgC from '../components/ImgC'
import CardsC from '../components/CardsC'
import { Col, Container, Row } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import Pagination from 'react-bootstrap/Pagination';
import clienteAxios from '../helpers/clientAxios'

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])

  let active = 1;
  let items = [];

  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }

  const getAllProducts = async () => {
   try {
    const getProducts = await clienteAxios.get('/products')
     setProducts(getProducts.data.getAllProducts)
   } catch (error) {
      console.log(error)
   }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <>
      {
        isLoading ?
          <div className='d-flex justify-content-center p-5' >
            <Spinner animation="grow" variant='success' style={{ width: '5rem', height: '5rem' }} />
          </div>
          :

          <>
            <ImgC url={'https://i0.wp.com/elplanetaurbano.com/wp-content/uploads/2020/10/Super-Mario-Bros-1-1280x720-1.jpg?fit=1280%2C720&ssl=1'} alt={'Mario bros'} width={'100%'} />

            <Container className='mt-5'>
              <Row>
                {
                  products.map((product) =>
                    <Col sm={12} md={6} lg={4} key={product._id}>
                      <CardsC url={product.imagen} titulo={product.titulo} descripcion={product.precio} idProduct={product._id}/>
                    </Col>
                  )
                }
              </Row>
            </Container>
            <div className='d-flex justify-content-center mt-5'>
              <Pagination>{items}</Pagination>
            </div>
          </>
      }

    </>
  )
}

export default HomePage