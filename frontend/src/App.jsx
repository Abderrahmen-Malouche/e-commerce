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
function App() {
 
  return (
    
    <div className='px-[2vw] sm:px-[5vw] md:px-[10vw] lg:px-[15vw]'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/collections' element={<Collections/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/product/:productId" element={<Product/>}/> 
          <Route path="/placeorder" element={<PlaceOrder/>}/>
        </Routes>
    </div>
  )
}

export default App
