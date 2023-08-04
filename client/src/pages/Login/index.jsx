import { useState } from "react";
import { loginUser, logoutUser } from "../../api/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCart } from "../../api/cart";
import Item from "antd/es/list/Item";

const initialError = {
    email: [],
    password: []
}

const LoginPage = () => {

    // const navigate = useNavigate();
    const [error, setError] = useState(initialError);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validator = () => {
        if(!email){
            setError((error) => ({...error, email: [...error.email, 'This field is required !']}))
        }
        if(!password){
            setError((error) => ({...error, password: [...error.password, 'This field is required !']}));
        }

        if(!email || !password) return;
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        if (name === 'email'){
            setEmail(value);
        }
        if (name === 'password'){
            setPassword(value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
 
        setError(initialError);
        validator();

        try {
            let body = {
                email: email,
                password: password
            }
            const response = await loginUser(body);
            const result = response.data;
            localStorage.setItem('auth', JSON.stringify(result));

            const {data} = await getCart();

            const cart = {
                products: data.map(item => ({
                    ...item.product,
                    totalPrice: item.price,
                    qty: item.qty,
                })),
                totalItem: data.map(items => items.qty).reduce((prev, curr) => prev + curr, 0),
                totalPrice: data.map(items => items.price).reduce((prev, curr) => prev + curr, 0)
            };
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.assign('/');
        } catch (err) {
            console.log(err)
        }
    }

    const bgImage = {
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80")',
    }
    return (
        <div style={bgImage} className="bg-cover min-h-screen items-center justify-center flex bg-center">
            <div className="bg-slate-200 opacity-90 h-auto w-80 p-6 rounded-2xl">
                <div className="my-4">
                    <p className="text-center text-lg font-bold">Login</p>                    
                </div>
                <div style={{borderBottom: '1px solid rgb(148 163 184)'}}></div>
                <div className="mb-4">
                    <form action="" onSubmit={handleSubmit}>
                        
                        <input name="email" type="email" className="bg-transparent border border-slate-400 mt-4 py-2 px-4 w-full h-10 rounded-3xl" placeholder="Email" onChange={e => handleInputChange(e)}/>                    
                        {error.email && error.email.map(err => <span style={{fontSize: '13px', color: 'red', marginTop: '-15px'}} key={err}>* {err}</span>)}
                        <input name="password" type="password" className="bg-transparent border border-slate-400 mt-4 py-2 px-4 w-full h-10 rounded-3xl" placeholder="Password" onChange={e => handleInputChange(e)}/>
                        {error.password && error.password.map(err => <span style={{fontSize: '13px', color: 'red', marginTop: '-15px'}} key={err}>* {err}</span>)}
                        <button type="submit" className="bg-slate-600 opacity-90 w-full h-10 mt-4 rounded-3xl text-white font-bold hover:opacity-100">LOGIN</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;