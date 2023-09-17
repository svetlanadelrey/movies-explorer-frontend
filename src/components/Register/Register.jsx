import React from 'react';
import { AuthForm } from '../AuthForm/AuthForm';
import { AuthLink } from '../AuthLink/AuthLink';
import { Logo } from '../Logo/Logo';
import './Register.css';

function Register({onRegister}) {

    return (
        <main>
            <section className="register">
                <div className="register__container">
                    <Logo />
                    <AuthForm
                        onRegister={onRegister}
                        title={"Добро пожаловать!"}
                        buttonText={"Зарегистрироваться"}
                    />
                    <AuthLink 
                        title={"Уже зарегистрированы?"}
                    />
                </div>
            </section>
        </main>
    );
}

export { Register };