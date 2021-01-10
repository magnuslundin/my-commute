import httpClient from './httpClient';

const getDeparturesByStation = (siteId) => httpClient.get('/mc-departures', {
    params: {
        siteId: siteId,
        maxResults: 10
    }
})

export {
    getDeparturesByStation
}
