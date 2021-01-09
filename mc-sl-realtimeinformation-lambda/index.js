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
            timeWindow =event.queryStringParameters.timeWindow || null
    if (!(siteId && timeWindow)) {
        return badRequest
    }
    
    const key = process.env.API_KEY_RTINFORMATION
    const realtimeinformation = await axios.get(
        `https://api.sl.se/api2/realtimedeparturesV4.json?key=${key}&siteid=${siteId}&timewindow=${timeWindow}`
      )
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