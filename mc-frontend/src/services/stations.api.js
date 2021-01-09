import httpClient from './httpClient';

const API_STATION_SEARCH_URL = process.env.VUE_APP_API_STATION_SEARCH_URL

const getStations = (searchString) => httpClient.get(API_STATION_SEARCH_URL, {
  params: {
    searchString: searchString,
    maxResults: 10
  }
})

export {
  getStations
}
