import React,{useContext} from 'react'
import {UserContext} from "../../context/userContext"

export default function Dashboard() {
  const {user} = useContext(UserContext)
    return (
    

    <div>
      <h1> Welcome</h1>
      {!!user && (<h2>{user.name}</h2>)}
    </div>
  )
}
