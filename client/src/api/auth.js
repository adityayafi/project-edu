import axios from 'axios';

export const loginUser = async (data) => {
    return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, data)
    // .then(res => {
    //     console.log(res.data);
    //     localStorage.setItem('auth', JSON.stringify(res.data))})
}

export const registerUser = async (data) => {
    return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, data,
    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    .then(res => console.log('Register Success', res));
}

export const logoutUser = async () => {
    let {token} = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    console.log(JSON.stringify(token))

    return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, null, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then(res => {
        localStorage.removeItem('auth');
        localStorage.removeItem('cart');
        window.location.assign('/');
        return res
    });
}

