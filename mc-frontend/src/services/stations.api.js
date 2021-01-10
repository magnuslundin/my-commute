import httpClient from './httpClient';

const getStations = (searchString) => httpClient.get('/mc-stations', {
  params: {
    searchString: searchString,
    maxResults: 10
  }
})

export {
  getStations
}
