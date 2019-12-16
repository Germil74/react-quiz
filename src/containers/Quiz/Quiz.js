import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from '../../axios/axios-quiz'
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizById, fetchQuizes} from "../../store/actions/quiz";


class Quiz extends Component {
debugger

    onAnswerClickHandler = (answerId) => {


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

    componentDidMount() {
this.props.fetchQuizById(this.props.match.params.id)
    }


    render() {
        return (
            <div className={classes.Quiz}>

                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.props.loading || !this.props.quiz
                            ? <Loader/>
                            : this.props.isFinished
                            ? <FinishedQuiz
                                results={this.props.results}
                                quiz={this.props.quiz}
                                onRetry={this.retryHandler}
                            />
                            : <ActiveQuiz
                                answers={this.props.quiz[this.props.activeQeestion].answers}
                                question={this.props.quiz[this.props.activeQeestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.props.quiz.length}
                                answerNumber={this.props.activeQeestion + 1}
                                state={this.props.answerState}
                            />

                    }


                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQeestion: state.quiz.activeQeestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)