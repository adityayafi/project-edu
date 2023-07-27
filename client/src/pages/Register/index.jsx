import { useState } from "react"
import { logoutUser, registerUser } from "../../api/auth";
import axios from "axios";

const initialError = {
    name: [],
    email: [],
    password: []
}

const RegisterPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(initialError)

    const validator = () => {
        if(!name){
            setError((error) => ({...error, name: [...error.name, 'This field is required !']}));
        }
        if(!email){
            setError((error) => ({...error, email: [...error.email, 'This field is required !']}));
        }
        if(!password){
            setError((error) => ({...error, password: [...error.password, 'This field is required !']}));
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        if(name === 'name'){
            setName(value);
        }
        if(name === 'email'){
            setEmail(value);
        }
        if(name === 'password'){
            setPassword(value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('full_name', name);
        data.append('email', email);
        data.append('password', password);

        for (var pair of data.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

        setError(initialError);
        validator();
        
        try {
            let body = {
                full_name: name,
                email: email,
                password: password
            }
            registerUser(body);
        } catch (error) {
            console.log(error)
        }

        // await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, data, {
        //     headers: {"Content-Type": "application/x-www-form-urlencoded"}
        // })
        // .then(res => console.log('Register Success', res))

    }

    const bgImage = {
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80")',
    }

    const handleLogout = () => {
        logoutUser();
    }

    return (
        <div style={bgImage} className="bg-cover min-h-screen items-center justify-center flex bg-center">
            <div className="bg-slate-200 opacity-90 h-auto w-80 p-6 rounded-2xl">
                <div className="my-4">
                    <p className="text-center text-lg font-bold">Registration</p>                    
                </div>
                <div style={{borderBottom: '1px solid rgb(148 163 184)'}}></div>
                <div className="mb-4">
                    <form action="" onSubmit={handleSubmit}>

                        <input name="name" type="text" className="bg-transparent border border-slate-400 mt-4 py-2 px-4 w-full h-10 rounded-3xl" placeholder="Full Name" onChange={e => handleInputChange(e)}/>
                        {error.name && error.name.map(err => <span style={{fontSize: '13px', color: 'red', marginTop: '-15px'}} key={err}>* {err}</span>)}
                        <input name="email" type="email" className="bg-transparent border border-slate-400 mt-4 py-2 px-4 w-full h-10 rounded-3xl" placeholder="Email" onChange={e => handleInputChange(e)}/>                    
                        {error.email && error.email.map(err => <span style={{fontSize: '13px', color: 'red', marginTop: '-15px'}} key={err}>* {err}</span>)}
                        <input name="password" type="password" className="bg-transparent border border-slate-400 mt-4 py-2 px-4 w-full h-10 rounded-3xl" placeholder="Password" onChange={e => handleInputChange(e)}/>
                        {error.password && error.password.map(err => <span style={{fontSize: '13px', color: 'red', marginTop: '-15px'}} key={err}>* {err}</span>)}
                        <button type="submit" className="bg-slate-600 opacity-90 w-full h-10 mt-4 rounded-3xl text-white font-bold hover:opacity-100">REGISTER</button>

                    </form>
                    <button onClick={handleLogout}>LOGOUT</button>
                </div>
            </div>            
        </div>
    )
}

export default RegisterPage;