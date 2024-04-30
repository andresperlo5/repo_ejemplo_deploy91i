import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ErrorPage from '../pages/ErrorPage'
import NavbarC from '../components/NavbarC'
import FooterC from '../components/FooterC'
import Registro from '../pages/Registro'
import ProductPage from '../pages/ProductPage'
import LoginPage from '../pages/LoginPage'
import UserPage from '../pages/UserPage'
import AdminPage from '../pages/AdminPage'
import AdminUsersPage from '../pages/AdminUsersPage'
import AdminProductsPage from '../pages/AdminProductsPage'
import CartPages from '../pages/CartPages'
import FavPage from '../pages/FavPage'
import PrivateRoute from '../components/PrivateRoute'

const RoutesViews = () => {
  return (
    <>
      <NavbarC />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<Registro />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/product/:id' element={<ProductPage />} />
        
        <Route path='/user' element={
          <PrivateRoute role='user'>
            <UserPage />
          </PrivateRoute>
        } />
        <Route path='/cart' element={
          <PrivateRoute role='user'>
            <CartPages />
          </PrivateRoute>
        } />
        <Route path='/fav' element={
          <PrivateRoute role='user'>
            <FavPage />
          </PrivateRoute>
        } />
        <Route path='/usersAdmin' element={
          <PrivateRoute role='admin'>
            <AdminUsersPage />
          </PrivateRoute>
        } />
        <Route path='/productsAdmin' element={
          <PrivateRoute role='admin'>
            <AdminProductsPage />
          </PrivateRoute>
        } />
        <Route path='/admin' element={
          <PrivateRoute role='admin'>
            <AdminPage />
          </PrivateRoute>
        } />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <FooterC />
    </>
  )
}

export default RoutesViews