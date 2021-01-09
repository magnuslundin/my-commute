const axios = require('axios').default

const httpClient = axios.create({
    headers: {
        "Content-Type": "application/json",
    }
})

export default httpClient
