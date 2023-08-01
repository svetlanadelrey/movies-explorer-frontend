import { AuthForm } from '../AuthForm/AuthForm';
import { AuthLink } from '../AuthLink/AuthLink';
import { Logo } from '../Logo/Logo';
import './Register.css';

function Register() {
    return (
        <section className="register">
            <div className="register__container">
                <Logo />
                <AuthForm
                    title={"Добро пожаловать!"}
                    buttonText={"Зарегистрироваться"}
                />
                <AuthLink 
                    title={"Уже зарегистрированы?"}
                />
            </div>
        </section>
    );
}

export { Register };