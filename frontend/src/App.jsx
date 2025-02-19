import {Route,Routes} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Orders from './pages/Orders'
import Cart from './pages/Cart'
import Collections from './pages/Collections'
import Login from './pages/Login'
import Product from './pages/Product'
import PlaceOrder from './pages/PlaceOrder'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';

function App() {
 
  return (
    
    <div className='container mx-auto'>
      <ToastContainer position='top-middle'/>
        <Navbar/>
        <SearchBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/collections' element={<Collections/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/product/:productId" element={<Product/>}/> 
          <Route path="/place_order" element={<PlaceOrder/>}/>
        </Routes>
        <Footer/>
    </div>
  )
}

export default App
