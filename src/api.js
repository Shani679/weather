import axios from 'axios';

const baseUrl = "http://dataservice.accuweather.com";

const apikey = 'jH0gnNe3bAvYkih7zsmx2LD6Iu5KTbP4';

export default {
    GET_CITIES: text => axios.get(`${baseUrl}/locations/v1/cities/autocomplete?apikey=${apikey}&q=${text}`),
    GET_CURRENT_WEATHER: key => axios.get(`${baseUrl}/currentconditions/v1/${key}?apikey=${apikey}`),
    GET_5_DAYS_FORECAST: key => axios.get(`${baseUrl}/forecasts/v1/daily/5day/${key}?apikey=${apikey}&metric=true`)
};