import axios from "axios";
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";

export default function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email, password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDncz4PmzwVAy6NCkjDzviCmXCRhe1sPrA'
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDncz4PmzwVAy6NCkjDzviCmXCRhe1sPrA'
        }

        const respons = await axios.post(url, authData)
        console.log(respons.data)
        const data = respons.data
        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)      // правельная дата
        localStorage.setItem('token', data.idToken)     //  сохроняем все важные данные в локал стородж
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', expirationDate)
        dispatch(authSuccess(data.localId))
        dispatch(authLogout(data.expiresIn))  // если мы проработаем в сессии больше часа сработает эта функция
    }
}

export function authLogout(time) {
return dispatch => {
setTimeout(() => {
    dispatch(logout())
}, time * 1000)
}
}
export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
return {
type: AUTH_LOGOUT
}
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}