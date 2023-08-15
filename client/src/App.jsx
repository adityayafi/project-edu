import { BrowserRouter as Router, Routes, Route, redirect, Navigate } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Account from './pages/Account';
import Layout from './pages/Layout';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Inovice from './pages/Inovice';
import { currentUser } from './utils';
// import Admin from './pages/Admin';
import Dashboard from './pages/Admin/dashboard';
import GetProduct from './pages/Admin/Products/getProducts';
import AddProduct from './pages/Admin/Products/addProducts';
import UpdateProduct from './pages/Admin/Products/updateProducts';
import AddAddress from './pages/Account/addAddress';
import UserProfile from './pages/Account/profile';
import Order from './pages/Account/order';
import Addresses from './pages/Account/address';
import GetCategories from './pages/Admin/Categories/getCategories';
import GetTags from './pages/Admin/Tags/getTags';
import GetInvoice from './pages/Admin/Orders/getInvoice';

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
            <Route path='/account/address/add' element={<AddAddress />}/>
            <Route index element={<UserProfile />}/>
            <Route path='/account/order' element={<Order />}/>
            <Route path='/account/address' element={<Addresses />}/>
            {/* <Route path='/account/admin' element={user && user.role === 'admin' ? <Admin /> : <Navigate to="/" replace/>}> */}
            <Route path='/account/admin/dashboard' element={user && user.role === 'admin' ? <Dashboard /> : <Navigate to="/" replace/>}/>
            <Route path='/account/admin/products' element={user && user.role === 'admin' ? <GetProduct /> : <Navigate to="/" replace/>}/>
            <Route path='/account/admin/products/add' element={user && user.role === 'admin' ? <AddProduct /> : <Navigate to="/" replace/>}/>
            <Route path='/account/admin/products/update/:id' element={user && user.role === 'admin' ? <UpdateProduct /> : <Navigate to="/" replace/>} />
            <Route path='/account/admin/categories' element={user && user.role === 'admin' ? <GetCategories /> : <Navigate to="/" replace/>}/>
            <Route path='/account/admin/tags' element={user && user.role === 'admin' ? <GetTags /> : <Navigate to="/" replace/>}/>
            <Route path='/account/admin/invoice' element={user && user.role === 'admin' ? <GetInvoice /> : <Navigate to="/" replace/>}/>
          </Route>
          <Route path='/checkout' element={user? <Checkout /> : <Navigate to="/" replace/>} />
          <Route path='/invoices/:id' element={user? <Inovice /> : <Navigate to="/" replace/>}/>
          <Route path='/cart' element={user ? <Cart /> : <Navigate to="/" replace/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
