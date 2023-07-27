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

function App() {

  let user = localStorage.getItem('auth') ? true : false;

  return (
    <Router>
      <Routes >
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={user ? <Account /> : <Navigate to="/" replace/>}>
            <Route path='/account/profile' element={<Profile />}/>
            <Route path='/account/order' element={<Order />}/>
            <Route path='/account/address' element={<Address />}/>
          </Route>
          <Route path='/cart' element={user ? <Cart /> : <Navigate to="/" replace/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
