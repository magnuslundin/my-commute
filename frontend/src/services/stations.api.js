import httpClient from './httpClient';

const STATION_SEARCH_END_POINT = '/stations/search';

const getStations = (searchString) => httpClient.get(STATION_SEARCH_END_POINT+`/${searchString}/10`)

export {
  getStations
}
