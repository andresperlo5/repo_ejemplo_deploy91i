import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import clienteAxios, { config } from '../helpers/clientAxios';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([])
  const [show, setShow] = useState(false);
  const [productState, setProductState] = useState({})

  const handleClose = () => setShow(false);

  const handleShow = (productData) => {
    setShow(true);
    setProductState(productData)
  }

  const getAllProducts = async () => {
   try {
    const getProduct = await clienteAxios.get('/products')
    setProducts(getProduct.data.getAllProducts)
   } catch (error) {
    console.log(error)
   }
  }

  const handleChange = (ev) => {
    setProductState({ ...productState, [ev.target.name]: ev.target.value })
  }

  const handleClick = async (ev) => {
   try {
    ev.preventDefault()
    const updateProduct = await clienteAxios.put(`/products/${productState._id}`, productState, config)
   
    if (updateProduct.status === 200) {
      handleClose()
      Swal.fire({
        title: "Producto actualizado con exito!",
        icon: "success"
      });
    }
   } catch (error) {
    console.log(error)
   }
  }

  const deleteProduct = async (idProduct) => {
   try {
    Swal.fire({
      title: "Estas seguro de que quieres eliminar a este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "SI, estoy seguro!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteProduct = await clienteAxios.delete(`/products/${idProduct}`, config)
      
        if(deleteProduct.status === 200){
          Swal.fire({
            title: "Eliminado!",
            text: "El producto se elimino correctamente.",
            icon: "success"
          });
        }
      }
    });
   } catch (error) {
    console.log(error)
   }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <>
      <div className='d-flex justify-content-center mt-3'>
        <Table striped bordered hover className='w-75'>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Precio Name</th>
              <th>Codigo</th>
              <th>Imagen</th>
              <th>Editar/Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((product) =>
                <tr key={product._id}>
                  <td>{product.titulo}</td>
                  <td>{product.precio}</td>
                  <td>{product.codigo}</td>
                  <td>
                    <img src={product.imagen} alt="" width={'50'} />
                  </td>
                  <td>
                    <Button variant="warning" onClick={() => handleShow(product)} className='mx-3'>
                      Editar
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Editar Producto</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>

                        <Form>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Titulo</Form.Label>
                            <Form.Control type="text" value={productState.titulo} name='titulo' onChange={handleChange} />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control type="text" value={productState.precio} name='precio' onChange={handleChange} />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control type="text" value={productState.codigo} name='codigo' onChange={handleChange} />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control type="text" value={productState.imagen} name='imagen' onChange={handleChange} />
                          </Form.Group>
                          <Button variant="primary" type="submit" onClick={handleClick}>
                            Submit
                          </Button>
                        </Form>
                      </Modal.Body>
                    </Modal>
                    <button className='btn btn-danger' onClick={() => deleteProduct(product._id)}>Eliminar</button>
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

export default AdminProductsPage