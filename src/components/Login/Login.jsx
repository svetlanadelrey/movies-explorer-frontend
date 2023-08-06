import { AuthForm } from '../AuthForm/AuthForm';
import { AuthLink } from '../AuthLink/AuthLink';
import { Logo } from '../Logo/Logo';
import './Login.css';

function Login() {
    return (
        <main>
            <section className="login">
                <div className="login__container">
                    <Logo />
                    <AuthForm
                        title={"Рады видеть!"}
                        buttonText={"Войти"}
                    />
                    <AuthLink 
                        title={"Ещё не зарегистрированы?"}
                    />
                </div>
            </section>
        </main>
    );
}

export { Login };