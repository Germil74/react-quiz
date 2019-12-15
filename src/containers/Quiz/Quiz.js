import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from '../../axios/axios-quiz'
import Loader from "../../components/UI/Loader/Loader";


class Quiz extends Component {
    state = {
        results: {}, // { [id]: 'success' 'error' }
        isFinished: false,
        activeQeestion: 0,
        answerState: null,  // { [id]: 'success' 'error' }
        quiz: [],
        loading: true
    }

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }
        const question = this.state.quiz[this.state.activeQeestion]
        const results = this.state.results
        if (question.rightAnswerID === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    console.log('Finished')
                    this.setState({
                        isFinished: true
                    })

                } else {
                    this.setState({
                        activeQeestion: this.state.activeQeestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)


        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }

    }

    isQuizFinished() {
        return this.state.activeQeestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQeestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    async componentDidMount() {
        try {
            const responsc = await axios.get(`/quizes/${this.props.match.params.id}.json`)
            const quiz = responsc.data
            this.setState({
                quiz,
                loading: false
            })
        } catch (e) {
            console.log(e)
        }
        console.log('Quiz ID = ', this.props.match.params.id)
    }


    render() {
        return (
            <div className={classes.Quiz}>

                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.state.loading
                            ? <Loader/>
                            : this.state.isFinished
                            ? <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}
                            />
                            : <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQeestion].answers}
                                question={this.state.quiz[this.state.activeQeestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQeestion + 1}
                                state={this.state.answerState}
                            />

                    }


                </div>
            </div>
        )
    }

}

export default Quiz