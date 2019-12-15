import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-459cd.firebaseio.com/'
})