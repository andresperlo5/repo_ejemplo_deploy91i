import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import clienteAxios, { config } from '../helpers/clientAxios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    email:'',
    pass:''
  })

  const handleChange = (ev) => {
    setFormValues({...formValues, [ev.target.name]: ev.target.value})
  }

  const handleClick = async(ev)=> {
  try {
    ev.preventDefault()
    if(!formValues.email || !formValues.pass){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algun campo esta vacio!",
      });
    }else{
      const sendFormLogin = await clienteAxios.post('/users/login',{
        emailUsuario:formValues.email,
          contrasenia: formValues.pass
      }, config)

      if(sendFormLogin.status === 200){
        Swal.fire({
          title: "Inicio de sesion OK!",
          icon: "success"
        });

         if(sendFormLogin.data.role === 'admin'){
          sessionStorage.setItem('token', JSON.stringify(sendFormLogin.data.token))
          sessionStorage.setItem('role', JSON.stringify(sendFormLogin.data.role))
          sessionStorage.setItem('idUsuario', JSON.stringify(sendFormLogin.data.idUsuario))
          navigate('/admin')
         }else{
          sessionStorage.setItem('token', JSON.stringify(sendFormLogin.data.token))
          sessionStorage.setItem('role', JSON.stringify(sendFormLogin.data.role))
          sessionStorage.setItem('idUsuario', JSON.stringify(sendFormLogin.data.idUsuario))
          navigate('/user')
         }
      }
    }
  } catch (error) {
    if(error.response.status === 400){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario y/o contraseña incorrecto!",
      });
    }
  }
  }
  return (
   <>
   <div className="d-flex justify-content-center">
   <Form className='w-25 mt-5'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email del Usuario</Form.Label>
        <Form.Control type="email" name='email' value={formValues.email} onChange={handleChange} placeholder="EJ: mail@dominio.com" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" name='pass' value={formValues.pass} onChange={handleChange}  placeholder="Password" />
      </Form.Group>

      <div className='d-flex justify-content-center'>
      <Button variant="success" type="submit" onClick={handleClick}>
        Iniciar Sesion
      </Button>
      </div>
    </Form>
   </div>
   </>
  )
}

export default LoginPage