import axios from 'axios';
import { GET_CONTINENTS, GET_COUNTRIES, GET_TRAVELS, GTE_DETAIL_COUNTRY, SORT_COUNTRIES } from './TypeActions';

const hostpet = 'http://192.168.0.10:3001';

export function getCountries() {
    return function (dispatch) {
        return axios.get(hostpet + '/countries')
            .then(json => {
                dispatch({ type: GET_COUNTRIES, payload: json.data });
            })
    }
}

export function getTrevels() {
    return function (dispatch) {
        return axios.get(hostpet + '/activities')
            .then(json => {
                dispatch({ type: GET_TRAVELS, payload: json.data });
            })
    }
}

export function getDetailsCountry(code) {
    return function (dispatch) {
        return axios.get(hostpet + `/countries/${code}`)
            .then(json => {
                dispatch({ type: GTE_DETAIL_COUNTRY, payload: json.data });
            })
    }
}

export function getContinents() {
    return function (dispatch) {
        return axios.get(hostpet + '/countries/continents')
            .then(json => {
                dispatch({ type: GET_CONTINENTS, payload: json.data });
            });
    }
}

export function sortCountries(filtByContinent, filtByTravel, ordAscDesc, ordBy) {
    let url = hostpet + `/countries/order`;
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

// export function getCodes(){
//     return({type: GET_CODES});
// }

/**funciones para filtrado y ordenamiento */

/**filtrado */

/**ordenado */