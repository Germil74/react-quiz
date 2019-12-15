import axios from '../../axios/axios-quiz'
import {
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS} from "./actionTypes";

export function fetchQuizes() {
return async dispatch => {
    dispatch(fetchQuizesStart())

    try {
        const respons = await axios.get('/quizes.json')
        const quizes = []
        Object.keys(respons.data).forEach((key, index) => {
            quizes.push({
                id: key,
                name: `Тест №${index + 1}`
            })
        })

        dispatch(fatchQuizesSuccess(quizes))
    } catch (e) {
        dispatch(fatchQuizesError(e))
    }
}
}

export function fetchQuizesStart(){
return {
    type: FETCH_QUIZES_START
}
}

export function fatchQuizesSuccess(quizes) {
return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
}
}

export function fatchQuizesError(e) {
return {
    type: FETCH_QUIZES_ERROR,
    error: e
}
}