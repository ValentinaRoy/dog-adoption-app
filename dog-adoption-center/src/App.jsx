import './App.css'
import {Routes,Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Footer from './components/Footer';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';
import Browse from './pages/Browse';

axios.defaults.baseURL='http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {
  
  return (
    <UserContextProvider>
      <NavBar/>
      <Toaster position='bottom-right' toastOptions={{duration:2000}} />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/browse' element={<Browse/>} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/resetPassword' element={<ResetPassword />} />
      </Routes>
      <Footer/>

    </UserContextProvider>
  )
}

export default App
