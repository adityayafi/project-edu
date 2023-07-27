import axios from "axios"

export const saveCart = async (token, cart) => {
    return await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/carts`, {items: cart}, {
        headers: {'Authorization': `Bearer ${token}` }
    })
}

export const getCart = async () => {
    let {token} = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/carts`, {
        headers: {'Authorization': `Bearer ${token}` }
    })
}