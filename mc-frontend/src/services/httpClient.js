const axios = require('axios').default

const httpClient = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

export default httpClient
