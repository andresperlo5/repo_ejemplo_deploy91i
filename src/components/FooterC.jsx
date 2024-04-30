import React from 'react'
import { Col, Container, Nav, Row } from 'react-bootstrap'
import ImgC from './ImgC'
import '../css/FooterC.css'
import { NavLink } from 'react-router-dom'

const FooterC = () => {
  const userLogin = 'user'

  return (

   <>
    {
      userLogin === 'user' &&
      <footer className='bg-navbar-propio p-5 mt-5'>
      <Container>
        <Row className='align-items-center'>
          <Col>
          <ImgC url={'https://icones.pro/wp-content/uploads/2021/04/icone-robot-android-vert.png'} alt={'logo'} width={'150'}/>
          </Col>
          <Col>
            <NavLink to="#home">FaceBook</NavLink>
            <NavLink to="#link">InstaGram</NavLink>
            <NavLink to="#link">YouTube</NavLink>
          </Col>
          <Col>
            <NavLink to="#home">Trabaja con nosotros</NavLink>
            <NavLink to="#link">Terminos y condiciones</NavLink>
            <NavLink to="#link">Contacto</NavLink>
          </Col>
          <Col>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.1180345796515!2d-65.2119432553906!3d-26.836197830078294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c0e8d0271b7%3A0x7946062ac490db30!2sGral.%20Paz%20576%2C%20T4000%20San%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1ses!2sar!4v1700055102208!5m2!1ses!2sar" width="250" height="150" style={{border: '0px'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </Col>
        </Row>
      </Container>
    </footer>
      
    } 
   
   </>


  )
}

export default FooterC