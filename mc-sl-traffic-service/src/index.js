require("dotenv").config()
const cors = require("cors")
const express = require("express")
const app = express()
const port = 3000
const axios = require("axios")

app.use(cors())

const baseURL = 'https://api.sl.se/api2'

app.get("/api/stations/search/:searchString/:maxResults?", async (req, res) => {

  const key = process.env.API_KEY_PLATSUPPSLAG
  const maxResults = req.params.maxResults | 10

  try {
    const response = await axios.get(
      `${baseURL}/typeahead.json?key=${key}&searchstring=${req.params.searchString}&maxresults=${maxResults}`
    )
    res.type('json')
    res.end(JSON.stringify(response.data, null, 4))
  } catch (error) {
    console.error(error)
    res.end("error")
  }
})

app.get("/api/station/realtimeinformation/:siteId/:timeWindow", async (req, res) => {

  const key = process.env.API_KEY_RTINFORMATION

  try {
    const response = await axios.get(
      `${baseURL}/realtimedeparturesV4.json?key=${key}&siteid=${req.params.siteId}&timewindow=${req.params.timeWindow}`
    )
    res.type('json')
    res.end(JSON.stringify(response.data, null, 4))
  } catch (error) {
    console.error(error)
    res.end("error")
  }
})

app.listen(port, () => console.log(`My Commute Service listening on port ${port}!`))
