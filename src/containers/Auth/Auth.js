import React, {Component} from 'react';
import classes from './Auth.module.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from 'is_js'
import Images from "../../components/UI/Images/Images";

class Auth extends Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите коректный email',
                valid: false,
                touched: false,      // Поле которое следит за полем, трогал его пользователь или нет
                validation: {
                    required: true,   //  обязательное поле для заполнения
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите коректный пароль',
                valid: false,
                touched: false,      // Поле которое следит за полем, трогал его пользователь или нет
                validation: {
                    required: true,   //  обязательное поле для заполнения
                    minLength: 6
                }
            }
        }
    };

    loginHandler = () => {

    }

    registerHandler = () => {

    }

    submitHandler = event => {
        event.preventDefault()
    }

    validateControl(value, validation){
        if(!validation){    //  если нет параметра validation то валидировать не нужно
            return true
        }
        let isValid = true

        if(validation.required){
            isValid = value.trim() !== '' && isValid
        }
        if(validation.email){
            isValid = is.email(value) && isValid
        }
        if(validation.minLength){
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }
    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls}
        const control ={...formControls[controlName]}
        control.value = event.target.value
        control.touched = true   // как только пользователь тронул импут он попал сюда и control.touched = true
        control.valid = this.validateControl(control.value, control.validation)    //  функция validateControl должна вернуть true или false в зависимости от валидации элемента.
        formControls[controlName] = control
        let isFormValid = true
        Object.keys(formControls).forEach(name => {
isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })

    }


    renderInput () {
       return Object.keys(this.state.formControls).map((controlName, index) => {
           const control = this.state.formControls[controlName]
           console.log(control)
           return (
               <Input
               key={controlName + index}
               type={control.type}
               value={control.value}
               valid={control.valid}
               touched={control.touched}
               label={control.label}
               shouldVaidate={!!control.validation}     // !! приводим к булевому типу control.validation
               errorMessage={control.errorMessage}
               onChange={event => this.onChangeHandler(event, controlName)}
               />
           )
       })
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>

                        { this.renderInput() }

                        <Button
                            type="success"
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Войти
                        </Button>
                        <Button
                            type="primary"
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Зарегистрироваться
                        </Button>


                    </form>
<Images />
                </div>
            </div>
        )
    }
}

export default Auth;