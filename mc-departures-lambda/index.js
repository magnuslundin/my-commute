require("dotenv").config()
const axios = require("axios")

const badRequest = {
    statusCode: 500,
    headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET"
    },
    body: 'Bad request'
}

exports.handler = async (event) => {
    if (!event.queryStringParameters) {
        return badRequest
    }
    
    const   siteId = event.queryStringParameters.siteId || null,
            maxResults =event.queryStringParameters.maxResults || null
    if (!(siteId && maxResults)) {
        return badRequest
    }
    
    const key = process.env.API_KEY
    const realtimeinformation = await axios.get('https://api.resrobot.se/v2/departureBoard?format=json', {
        params: {
            key: key,
            id: siteId,
            maxJourneys: maxResults
        }
    })
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET"
        },
        body: JSON.stringify(realtimeinformation.data),
    };
    return response
}