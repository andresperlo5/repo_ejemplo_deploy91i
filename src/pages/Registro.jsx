import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import clienteAxios, { config } from '../helpers/clientAxios';

const Registro = () => {
  const [formValues, setFormValues] = useState({
    user: '',
    email: '',
    pass: '',
    rpass: ''
  })

  const handleChange = (ev) => {
    setFormValues({ ...formValues, [ev.target.name]: ev.target.value })
  }

  const handleClick = async (ev) => {
    try {
      ev.preventDefault()
      const { user, email, pass, rpass } = formValues

      if (!user || !email || !pass || !rpass) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algun campo esta vacio!",
        });
      } else {
        if (pass === rpass) {
          const sendFormRegister = await clienteAxios.post('/users', {
            nombreUsuario: user,
            emailUsuario: email,
            contrasenia: pass
          }, config)
        }
      }
    } catch (error) {
      console.log(error)
    }


    return (
      <>
        <h2>Registro</h2>
        <div className='d-flex justify-content-center'>
          <Form className='w-25'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="text" name='user' value={formValues.user} onChange={handleChange} placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email del Usuario</Form.Label>
              <Form.Control type="email" name='email' value={formValues.email} onChange={handleChange} placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" name='pass' value={formValues.pass} onChange={handleChange} placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Repetir Contraseña</Form.Label>
              <Form.Control type="password" name='rpass' value={formValues.rpass} onChange={handleChange} placeholder="Password" />
            </Form.Group>
            <div className='d-flex justify-content-center'>
              <Button variant="success" type="submit" onClick={handleClick}>
                Enviar Formulario
              </Button>
            </div>
          </Form>
        </div>
      </>
    )
  }
}

export default Registro