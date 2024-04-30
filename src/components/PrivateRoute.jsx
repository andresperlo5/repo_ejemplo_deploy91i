import { useNavigate } from "react-router-dom"


const PrivateRoute = ({children, role}) => {
  const navigate = useNavigate()
  const token = JSON.parse(sessionStorage.getItem('token'))
  const roleUser = JSON.parse(sessionStorage.getItem('role'))

  if(token){
    if(role === roleUser){
      return children
    }else{
      if(roleUser === 'admin'){
        navigate('/admin')
      }else{
        navigate('/user')
      }
    }
  }else{
    navigate('/')
  }
}

export default PrivateRoute