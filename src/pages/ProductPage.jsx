import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import clienteAxios, { config } from "../helpers/clientAxios"


const ProductPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState({})
  const token = JSON.parse(sessionStorage.getItem('token')) || ''

  const getOneProduct = async () => {
    try {
      const data = await clienteAxios.get(`/products/${params.id}`)
      setProduct(data.data.getProduct)
    } catch (error) {
      console.log(error)
    }
  }

  const addProdCart = async () => {
    try {
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Para agregar este producto al carrito iniciar sesion",
          text: "Seras redirigido a iniciar tu sesion!",
        });

        setTimeout(() => {
          navigate('/login')
        }, 3000)
      } else {
        /* const addProdFetch = await fetch(`http://localhost:3001/api/products/cart/${params.id}`,{
          method:'POST',
          
        }) */
        const addProduct = await clienteAxios.post(`/products/cart/${params.id}`,{}, config)

        if (addProduct.status === 200) {
          Swal.fire({
            title: "Agregado al Carrito!",
            text: "Producto agregado correctamente!",
            icon: "success"
          });
        }
      }
    } catch (error) {
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: error.response.data.msg,
        });
      }
    }
  }

  const addProdFav = async() => {
    try {
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Para agregar este producto a Favoritos iniciar sesion",
          text: "Seras redirigido a iniciar tu sesion!",
        });

        setTimeout(() => {
          navigate('/login')
        }, 3000)
      } else {
        const addProduct = await clienteAxios.post(`/products/fav/${params.id}`, {}, config)

          if (addProduct.status === 200) {
            Swal.fire({
              title: "Agregado a Favoritos!",
              text: "Producto agregado correctamente!",
              icon: "success"
            });
          }
      }
    } catch (error) {
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: error.response.data.msg,
        });
      }
    }
  }

  useEffect(() => {
    getOneProduct()
  }, [])
  return (
    <>
      <Container>
        <Row className="mt-5">
          <Col>
            <img src={product.imagen} alt="" />
          </Col>
          <Col>
            <p>{product.titulo}</p>
            <p>{product.precio}</p>
            <div>
              <Button variant="success" className="mx-2" onClick={addProdCart}>Añadir al Carrito</Button>
              <Button variant="danger" onClick={addProdFav}>Añadir a Favoritos</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ProductPage