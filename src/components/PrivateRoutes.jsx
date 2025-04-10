import React from 'react'
import { Navigate, useNavigate, useNavigation } from 'react-router-dom'
import { getTheUserRole } from '../services/api';

const PrivateRoutes = ({children}) => {
    async function printTheUser(){
        console.log(await getTheUserRole(localStorage.getItem("token")));
    }
    printTheUser();
    
    const navigate=useNavigate();
    if(localStorage.getItem("token")!==null)
  return (
    <div>
      {children}
    </div>
  )
  else
  {
    return <Navigate to="/login"/>
   
  }
}

export default PrivateRoutes
