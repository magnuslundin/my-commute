import httpClient from './httpClient';

const API_REALTIME_INFORMATION_URL = process.env.VUE_APP_API_REALTIME_INFORMATION_URL

const getRealTimeInformationByStation = (siteId, timeWindowInMinutes) => httpClient.get(API_REALTIME_INFORMATION_URL, {
    params: {
        siteId: siteId,
        timeWindow: timeWindowInMinutes
    }
})

export {
    getRealTimeInformationByStation
}
