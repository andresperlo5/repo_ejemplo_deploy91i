import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import clienteAxios, { config } from '../helpers/clientAxios';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([])
  const [show, setShow] = useState(false);
  const [userState, setUserState] = useState({})

  const handleClose = () => setShow(false);

  const handleShow = (userData) => {
    setShow(true);
    setUserState(userData)
  }

  const getAllUsers = async () => {
    try {
      const getUsers = await clienteAxios.get('/users', config)
      setUsers(getUsers.data.getAllUsers)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (ev) => {
    setUserState({ ...userState, [ev.target.name]: ev.target.value })
  }

  const handleClick = async (ev) => {
  try {
    ev.preventDefault()
    const updateUser = await clienteAxios.put(`/users/${userState._id}`, userState, config)

    if (updateUser.status === 200) {
      handleClose()
      Swal.fire({
        title: "Usuario actualizado con exito!",
        icon: "success"
      });
    }
  } catch (error) {
    console.log(error)
  }
  }

  const deleteUser = (idUser) => {
    Swal.fire({
      title: "Estas seguro de que quieres eliminar a este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "SI, estoy seguro!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteUser = await clienteAxios.delete(`/users/${idUser}`, config)

        if (deleteUser.status === 200) {
          Swal.fire({
            title: "Eliminado!",
            text: "El usuario fue eliminado correctamente.",
            icon: "success"
          });
        }
      }
    });
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <>
      <div className='d-flex justify-content-center mt-3'>
        <Table striped bordered hover className='w-75'>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Correo</th>
              <th>Role</th>
              <th>Editar/Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user) =>
                <tr key={user._id}>
                  <td>{user.nombreUsuario}</td>
                  <td>{user.emailUsuario}</td>
                  <td>{user.role}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleShow(user)} className='mx-3'>
                      Editar
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Editar Usuario</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control type="text" value={userState.nombreUsuario} onChange={handleChange} name='nombreUsuario' />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={userState.emailUsuario} onChange={handleChange} name='emailUsuario' />
                          </Form.Group>


                          <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Role</Form.Label>
                            <Form.Control type="text" value={userState.role} onChange={handleChange} name='role' />
                          </Form.Group>
                          <Button variant="primary" type="submit" onClick={handleClick}>
                            Enviar Datos
                          </Button>
                        </Form>
                      </Modal.Body>
                    </Modal>
                    <Button variant='danger' onClick={() => deleteUser(user._id)} className={user.role === 'admin' && 'd-none'}>Eliminar</Button>
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

export default AdminUsersPage