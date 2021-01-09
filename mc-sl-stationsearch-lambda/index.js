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
    
    const   searchString = event.queryStringParameters.searchString|| null,
            maxResults =event.queryStringParameters.maxResults || null
    if (!(searchString && maxResults)) {
        return badRequest
    }
    
    const key = process.env.API_KEY_PLATSUPPSLAG
    const stations = await axios.get(
        `https://api.sl.se/api2/typeahead.json?key=${key}&searchstring=${searchString}&maxresults=${maxResults}`
      )
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET"
        },
        body: JSON.stringify(stations.data),
    };
    return response
}