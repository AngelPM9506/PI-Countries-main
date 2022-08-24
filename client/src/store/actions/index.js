import axios from 'axios';
import {
    GET_CONTINENTS,
    GET_COUNTRIES,
    GET_TRAVELS,
    GTE_DETAIL_COUNTRY,
    SORT_COUNTRIES,
    SEARCH_BY_NAME,
    CLEAR_DETAILS
} from './TypeActions';

//const hostpet = 'http://192.168.0.7:3001';

export function getCountries() {
    return function (dispatch) {
        return axios.get('/countries')
            .then(json => {
                dispatch({ type: GET_COUNTRIES, payload: json.data });
            })
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
            })
    }
}

export function getContinents() {
    return function (dispatch) {
        return axios.get('/countries/continents')
            .then(json => {
                dispatch({ type: GET_CONTINENTS, payload: json.data });
            });
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
            });
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

// export function getCodes(){
//     return({type: GET_CODES});
// }

/**funciones para filtrado y ordenamiento */

/**filtrado */

/**ordenado */