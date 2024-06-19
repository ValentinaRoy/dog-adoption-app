import React,{useContext,useState} from 'react'
import { UserContext } from '../../context/userContext'
import PostDog from './DogAdoptionForm';

export default function Browse() {
    const {user} = useContext(UserContext);
    const [showForm,setShowForm] = useState(false);
    const onClick = () =>{
      setShowForm(!showForm);
    }
  return (
    <div>
      {/* 1.filters
       2. the cards displaying the dogs but with only one image, name , breed, location and on clicking it gets the rest of the details
        3. the button to post for adoption  */}
      {!!user && <button onClick={onClick}>{!showForm && 'Post for adoption'}</button>}
      {showForm && <PostDog onClose={onClick}/>}
    </div>
  )
}
