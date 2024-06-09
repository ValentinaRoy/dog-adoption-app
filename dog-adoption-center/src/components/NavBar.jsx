import React from 'react'
import {Link} from 'react-router-dom'
export default function NavBar() {
  return (
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/login'>Login</Link>
      <Link to='/search'>Browse</Link>
      <Link to='/register'>register</Link>
    </nav>
  )
}
