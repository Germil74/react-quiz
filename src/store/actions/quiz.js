import axios from '../../axios/axios-quiz'
import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    QUIZ_SET_STATE
} from "./actionTypes";

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

export function fetchQuizById(quisId) {
return async dispatch => {
    dispatch(fetchQuizesStart())

    try {
        const responsc = await axios.get(`/quizes/${quisId}.json`)
        const quiz = responsc.data
     dispatch(fetchQuizSuccess(quiz))
    } catch (e) {
       dispatch(fatchQuizesError(e))
    }

}
}
export function fetchQuizSuccess(quiz) {
return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
}
}
export function quizSetState(answerState, results) {
return{
    type: QUIZ_SET_STATE,
    answerState, results
}
}



export function quizAnswerClick(answerId) {
return (dispatch, getState) => {
    const state = getState().quis
    if (state.answerState) {
        const key = Object.keys(state.answerState)[0]
        if (state.answerState[key] === 'success') {
            return
        }
    }
    const question = state.quiz[state.activeQeestion]
    const results = state.results
    if (question.rightAnswerID === answerId) {
        if (!results[question.id]) {
            results[question.id] = 'success'
        }
        dispatch(quizSetState({[answerId]: 'success'}, results))

        const timeout = window.setTimeout(() => {
            if (isQuizFinished()) {
                console.log('Finished')
                // this.setState({
                //     isFinished: true
                // })

            } else {
                // this.setState({
                //     activeQeestion: this.state.activeQeestion + 1,
                //     answerState: null
                // })
            }
            window.clearTimeout(timeout)
        }, 1000)


    } else {
        results[question.id] = 'error'
        dispatch(quizSetState({[answerId]: 'error'}, results))

    }
}
}