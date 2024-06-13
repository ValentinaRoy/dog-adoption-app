import React,{useContext} from 'react'
import { UserContext } from '../../context/userContext'
export default function Browse() {
    const {user} = useContext(UserContext);
  return (
    <div>
      {!!user && <h1>hi{user.name} </h1>}
    </div>
  )
}
