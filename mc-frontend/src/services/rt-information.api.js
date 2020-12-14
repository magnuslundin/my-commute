import httpClient from './httpClient';

const REALTIME_INFORMATION_SEARCH_END_POINT = '/station/realtimeinformation';

const getRealTimeInformationByStation = (siteId, timeWindowInMinutes) => httpClient.get(REALTIME_INFORMATION_SEARCH_END_POINT+`/${siteId}/${timeWindowInMinutes}`)

export {
    getRealTimeInformationByStation
}
