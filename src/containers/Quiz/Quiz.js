import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {
    state = {
        results:{}, // { [id]: 'success' 'error' }
        isFinished:false,
        activeQeestion: 0,
        answerState: null,  // { [id]: 'success' 'error' }
        quiz: [
            {
                question: ' Какого цвета небо?',
                rightAnswerId: 3,
                id: 1,
                answers: [
                    {id: 1, text: "Чёрный"},
                    {id: 2, text: "Красный"},
                    {id: 3, text: "Синий"},
                    {id: 4, text: "Зелёный"}
                ]
            },
            {
                question: ' В каком году основали Санкт-Петербург?',
                rightAnswerId: 3,
                id: 2,
                answers: [
                    {id: 1, text: "1700"},
                    {id: 2, text: "1702"},
                    {id: 3, text: "1703"},
                    {id: 4, text: "1803"}
                ]
            }

        ]
    }

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState){
            const key = Object.keys(this.state.answerState)[0]
            if(this.state.answerState[key] === 'success'){
               return
            }
        }
        console.log('Answer Id:', answerId)
        const question = this.state.quiz[this.state.activeQeestion]
        const results = this.state.results

        if (question.rightAnswerId === answerId) {
            if(!results[question.id]){
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
                        isFinished:true
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
    retryHandler=()=>{
        console.log('retryHandler')
this.setState({
    activeQeestion:0,
    answerState:null,
    isFinished:false,
    results: {}
})
    }

    componentDidMount() {

        console.log('Quiz ID = ', this.props.match.params.id)
    }


    render() {
        return (
            <div className={classes.Quiz}>

                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.state.isFinished
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