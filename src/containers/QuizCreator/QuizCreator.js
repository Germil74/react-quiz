import React, {Component} from 'react';
import classes from './QuizCreator.module.css'
import Button from "../../components/UI/Button/Button";
import {creatControl, validate, validateForm} from '../../form/formFramework'
import Input from "../../components/UI/Input/Input";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select";
import {connect} from "react-redux";
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/create";

function createOptionControl(number) {
    return creatControl({
        label: `Вариант ${number}`,
        errorMessage: 'Значение не может быть пустым',
        id: number
    }, {required: true})
}

function createFormControls() {
    return {
        question: creatControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

class QuizCreator extends Component {
    state = {

        isFormValid: false,
        rightAnswerID: 1,
        formControls: createFormControls()
    }

    submitHandler = event => {
        event.preventDefault()
    }

    addQuestionHandler = event => {
        event.preventDefault()
        const {question, option1, option2, option3, option4} = this.state.formControls

        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerID: this.state.rightAnswerID,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }
        this.props.createQuizQuestion(questionItem)

        this.setState({
            isFormValid: false,
            rightAnswerID: 1,
            formControls: createFormControls()
        })
     //   console.log('state после', this.state)
    }

    creatQuizHandler = event => {    // делаем функцию асинхронной  дабавляя async
       event.preventDefault()

    this.setState({
        isFormValid: false,
        rightAnswerID: 1,
        formControls: createFormControls()
    })
    this.props.finishCreateQuiz()

        // axios.post('https://react-quiz-459cd.firebaseio.com/quizes.json', this.state.quiz).then(respons => {
        //     console.log(respons)
        // }).catch(error => {
        //     console.log(error)
        // })
    }

    changeHandler = (value, controlName) => {
        // console.log('Функция changeHandler в Input  Значение' + value, ' controlName = ' + controlName)
        const formControls = {...this.state.formControls}    // создаем копию state
        const control = {...formControls[controlName]}         // создаем копию state
        control.touched = true   // как только пользователь тронул импут он попал сюда и control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }


    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <Auxiliary key={controlName + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />
                    {index === 0 ? <hr/> : null}
                </Auxiliary>
            )
        })
    }

    selectChangeHandler = event => {
        this.setState({
            rightAnswerID: +event.target.value  // + приводим значение к числу
        })
    }

    render() {
        const select = <Select
            label='Выберете правельный ответ'
            value={this.state.rightAnswerID}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>
                    <form onSubmit={this.submitHandler}>
                        {this.renderControls()}

                        {select}
                        <Button
                            type={'primary'}
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}

                        >
                            Добавить вопрос
                        </Button>
                        <Button
                            type={'success'}
                            onClick={this.creatQuizHandler}
                            disabled={this.props.quiz.length === 0}
                        >
                            Создать тест
                        </Button>

                    </form>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
 return {
     quiz: state.create.quiz
 }
}

function mapDispatchToProps(dispatch) {
    return {
createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);