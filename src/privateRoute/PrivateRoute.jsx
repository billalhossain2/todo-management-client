import React, { useContext } from 'react'
import { authContext } from '../provider/AuthProvider'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
  const {user, loading} = useContext(authContext)
  if(loading){
    return <h1>Loading.......</h1>
  }
  
  if(!user){
    return <Navigate to="/"></Navigate>
  }
  return children;
}

export default PrivateRoute