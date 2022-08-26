import axios from 'axios';
import {
    GET_CONTINENTS,
    GET_COUNTRIES,
    GET_TRAVELS,
    GTE_DETAIL_COUNTRY,
    SORT_COUNTRIES,
    SEARCH_BY_NAME,
    CLEAR_DETAILS,
    LOADING_APP_CONTENT
} from './TypeActions';

//const hostpet = 'http://192.168.0.7:3001';

export function getCountries() {
    return function (dispatch) {
        dispatch({ type: LOADING_APP_CONTENT, payload: true });
        return axios.get('/countries')
            .then(json => {
                dispatch({ type: GET_COUNTRIES, payload: json.data });
                dispatch({ type: LOADING_APP_CONTENT, payload: false })
            }, error => console.error(error))
    }
}

export function getTrevels() {
    return function (dispatch) {
        return axios.get('/activities')
            .then(json => {
                dispatch({ type: GET_TRAVELS, payload: json.data });
            }, error => console.error(error))
    }
}

export function getDetailsCountry(code) {
    return function (dispatch) {
        return axios.get(`/countries/${code}`)
            .then(json => {
                dispatch({ type: GTE_DETAIL_COUNTRY, payload: json.data });
            }, error => console.error(error))
    }
}

export function getContinents() {
    return function (dispatch) {
        return axios.get('/countries/continents')
            .then(json => {
                dispatch({ type: GET_CONTINENTS, payload: json.data });
            }, error => console.error(error));
    }
}

export function sortCountries(filtByContinent, filtByTravel, ordAscDesc, ordBy) {
    let url = `/countries/order`;
    url += `?continent=${filtByContinent}`;
    url += `&travel=${filtByTravel}`;
    url += `&tyOrder=${ordAscDesc}`;
    url += `&orderBy=${ordBy}`;
    return function (dispatch) {
        return axios.get(url)
            .then(json => {
                dispatch({ type: SORT_COUNTRIES, payload: json.data });
            }, error => console.error(error));
    }
}

export function searchByName(name) {
    return function (dispatch) {
        return axios.get(`/countries?name=${name}`)
            .then(json => {
                dispatch({ type: SEARCH_BY_NAME, payload: json.data });
                return json;
            }, error => error.response);
    }
}

export function clearDetails() {
    return ({ type: CLEAR_DETAILS, payload: {} })
}

export function loadingAppContent(stateLoad) {
    return ({ type: LOADING_APP_CONTENT, payload: stateLoad });
}

// export function getCodes(){
//     return({type: GET_CODES});
// }

/**funciones para filtrado y ordenamiento */

/**filtrado */

/**ordenado */