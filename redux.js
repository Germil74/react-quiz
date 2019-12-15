const redux = require('redux');
const initialState = {    // начальное состояние state
    counter: 0
}
// Reducer
const reducer = (state = initialState, action) => {
    if(action.type === 'ADD'){
       return {
           counter: state.counter +1
       }
    }
    if(action.type === 'SUB'){
        return {
            counter: state.counter -1
        }
    }
    if(action.type === 'ADD_NUMBER'){
        return {
            counter: state.counter + action.value
        }
    }

return state

}
// Store
const store  = redux.createStore(reducer)  // Создаём состояние всего приложения   reducer не вызываем (скобки не ставим)
store.subscribe(() => {  // при любом изменение стора мы попадаем в функцию subscribe
    console.log('subscribe ',store.getState())
})


//console.log('1', store.getState())

// Action

const addCounter = {type: 'ADD'}
store.dispatch(addCounter)
//console.log('2', store.getState())

store.dispatch({type: 'SUB'})
//console.log('3', store.getState())

store.dispatch({type: 'ADD_NUMBER', value: 10})
//console.log('4', store.getState())