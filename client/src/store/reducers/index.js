import {
    CLEAR_DETAILS,
    GET_CONTINENTS,
    GET_COUNTRIES,
    GET_TRAVELS,
    GTE_DETAIL_COUNTRY,
    LOADING_APP_CONTENT,
    SEARCH_BY_NAME,
    SORT_COUNTRIES
} from '../actions/TypeActions';

const initState = {
    loadedCountries: [],
    continents: [],
    loadedTravels: [],
    detailCountry: {},
    codes: [],
    nCountries: 0,
    loadingCom: false
}

const reducer = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_COUNTRIES:
            return ({
                ...state,
                loadedCountries: payload,
                codes: payload.map(country => ({ code: country.code, name: country.name })),
                nCountries: payload.length
            })
        case GTE_DETAIL_COUNTRY:
            return ({
                ...state,
                detailCountry: payload
            })
        case GET_TRAVELS:
            return ({
                ...state,
                loadedTravels: payload
            })
        case GET_CONTINENTS:
            return ({
                ...state,
                continents: payload
            })
        case SORT_COUNTRIES:
            return ({
                ...state,
                loadedCountries: payload,
                //codes: payload.map(country => ({ code: country.code, name: country.name })),
                nCountries: payload.length
            })
        case SEARCH_BY_NAME:
            return ({
                ...state,
                loadedCountries: payload,
                //codes: payload.map(country => ({ code: country.code, name: country.name })),
                nCountries: payload.length
            })
        case CLEAR_DETAILS:
            return ({
                ...state,
                detailCountry: payload
            })
        case LOADING_APP_CONTENT:
            return ({
                ...state,
                loadingCom: payload
            })
        default:
            return state
    }
}

export default reducer;