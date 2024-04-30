import React, { useEffect, useState } from 'react'
import CardsC from '../components/CardsC'
import clienteAxios, { config } from '../helpers/clientAxios'

const FavPage = () => {
  const [productsFav, setProductFav] = useState([])

  const getAllProductsFav = async () => {
    try {
      const idUsuario = JSON.parse(sessionStorage.getItem('idUsuario'))
      const dataUser = await clienteAxios.get(`/users/${idUsuario}`, config)

      if (dataUser.status === 200) {
        const productsFav = await clienteAxios.get(`/favs/${dataUser.data.getUser.idFav}`, config)
        setProductFav(productsFav.data.products)
      }

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getAllProductsFav()
  }, [])
/* url, titulo, descripcion, */
  return (
     <>
      {
        productsFav.map((product) =>
        <CardsC url={product.imagen} titulo={product.titulo} descripcion={product.precio} idProduct={product._id} idPage={'FavPage'} key={product._id}/>
        )
      }
     </>
  )
}

export default FavPage