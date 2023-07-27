const dotenv = require('dotenv');

dotenv.config();

export default{
    api_host: process.env.VITE_BACKEND_URL
}