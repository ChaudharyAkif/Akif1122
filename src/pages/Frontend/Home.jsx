import React, { useContext } from 'react'
import { AuthContext } from '../../context/authContext'

const Home = () => {
  
  let {handleLogout} = useContext(AuthContext)
  
  return (
    <div>
      This is Homepage
      <button onClick={handleLogout}>LOGOUT </button>
    </div>  
  )
}

export default Home
