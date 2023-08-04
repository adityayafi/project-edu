import { BrowserRouter as Router, Routes, Route, redirect, Navigate } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Account from './pages/Account';
import Profile from './components/profile';
import Order from './components/order';
import Address from './components/address';
import Layout from './pages/Layout';
import Cart from './pages/Cart';
import AddAddress from './components/addAddress';
import Checkout from './pages/Checkout';
import Inovice from './pages/Inovice';
import { currentUser } from './utils';
import Admin from './pages/Admin';

function App() {

  let {user} = currentUser ? JSON.parse(currentUser) : false;

  return (
    <Router>
      <Routes >
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={user ? <Account /> : <Navigate to="/" replace/>}>
            <Route path='/account/add' element={<AddAddress />}/>
            <Route path='/account/profile' element={<Profile />}/>
            <Route path='/account/order' element={<Order />}/>
            <Route path='/account/address' element={<Address />}/>
          </Route>
          <Route path='/checkout' element={user? <Checkout /> : <Navigate to="/" replace/>} />
          <Route path='/invoices/:id' element={user? <Inovice /> : <Navigate to="/" replace/>}/>
          <Route path='/cart' element={user ? <Cart /> : <Navigate to="/" replace/>}/>
          <Route path='/admin' element={user && user.role === 'admin' ? <Admin /> : <Navigate to="/" replace/>}>
            <Route index element={<Dashboard />}/>
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
