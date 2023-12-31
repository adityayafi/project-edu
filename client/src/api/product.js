import axios from "axios"

export const getProduct = async (params) => {
    return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products?${params}`, {
        headers : {
            'Access-Control-Allow-Origin':'*'
        }
    })
}

export const getCategories = async () => {
    return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`)
}

export const getTag = async () => {
    return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tags`)
}

export const getImages = async (fileName) => {
    return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/public/${fileName}`)
}