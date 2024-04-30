import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../css/NavbarC.css'
import ImgC from './ImgC';
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import clienteAxios, { config } from '../helpers/clientAxios';
import Swal from 'sweetalert2';

const NavbarC = () => {
  const navigate = useNavigate()
  const token = JSON.parse(sessionStorage.getItem('token'))
  const role = JSON.parse(sessionStorage.getItem('role'))
  const [show, setShow] = useState(false);
  const [newProduct, setNewProduct] = useState({
    titulo: '',
    precio: 0,
    codigo: '',
  })

  const [imagen, setImagen] = useState({})

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const singOff = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('role')
    navigate('/')
  }

  const handleChange = (ev) => {
    setNewProduct({ ...newProduct, [ev.target.name]: ev.target.value })
  }

  const handleChangeImg = (ev) => {
    setImagen(ev.target.files[0]);
  }

  const handleClick = async (ev) => {
    try {
      ev.preventDefault()
      const { titulo, precio, codigo } = newProduct
      if (!titulo || !precio || !codigo) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algun campo esta vacio!",
        });
      } else {

        const data = new FormData()
        data.append('titulo', titulo);
        data.append('precio', precio);
        data.append('codigo', codigo);
        data.append('imagen', imagen);
        
        const createProd = await clienteAxios.post('/products', data, config)

        if (createProd.status === 201) {
          Swal.fire({
            title: "Producto creado con exito!",
            icon: "success"
          });
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Navbar expand="lg" className="bg-navbar-propio">
      <Container fluid>
        <Navbar.Brand href={token && role === 'user' ? '/user' : token && role === 'admin' ? '/admin' : '/'}>
          <ImgC url={'https://icones.pro/wp-content/uploads/2021/04/icone-robot-android-vert.png'} alt={'logo'} width={'50'} idComponent='Navbar' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={token && role === 'user' ? '/user' : token && role === 'admin' ? '/admin' : '/'} className='nav-link'>Inicio</Link>
            {
              token && role === 'user'
                ?
                <>
                  <Link to="#link" className='nav-link'>Sobre Nosotros</Link>
                  <Link to="#link" className='nav-link'>Contacto</Link>
                  <Link to="/fav" className='nav-link'>Favoritos</Link>
                  <Link to="/cart" className='nav-link'>Carrito</Link>
                </>
                : token && role === 'admin'
                  ?
                  <>
                    <Link to="/usersAdmin">Usuarios</Link>
                    <Link to="/productsAdmin">Productos</Link>
                    <Button variant="success" onClick={handleShow}>
                      Crear Producto
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Crear Producto</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Titulo</Form.Label>
                            <Form.Control type="text" placeholder="EJ: coca-cola" name='titulo' onChange={handleChange} />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control type="number" placeholder="EJ: $1500" name='precio' onChange={handleChange} />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Codigo</Form.Label>
                            <Form.Control type="text" placeholder="EJ: 6sa54d56d" name='codigo' onChange={handleChange} />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control type="file" onChange={handleChangeImg} />
                          </Form.Group>

                          <div className='d-flex justify-content-center'>
                            <Button variant="success" type="submit" onClick={handleClick}>
                              Guardar Datos
                            </Button>
                          </div>
                        </Form>
                      </Modal.Body>
                    </Modal>
                  </>
                  :
                  <>
                    <Link to="#link" className='nav-link'>Sobre Nosotros</Link>
                    <Link to="#link" className='nav-link'>Contacto</Link>
                  </>
            }
          </Nav>
          {
            token && role
              ?
              <Nav className="ms-auto">
                <Link to="#" className='nav-link' onClick={singOff}>Cerrar Sesion</Link>
              </Nav>
              :
              <Nav className="ms-auto">
                <Link to="/login" className='nav-link'>Iniciar Sesion</Link>
                <Link to="/register" className='nav-link'>Registrarse</Link>
              </Nav>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarC