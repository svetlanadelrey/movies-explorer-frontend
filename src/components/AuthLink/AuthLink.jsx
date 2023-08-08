import './AuthLink.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function AuthLink({title}) {
    const location = useLocation();
    const isSignUp = location.pathname === "/signup";
    
    return (
        <div className="auth-links">
            <p className="auth-links__title">{title}</p>
            {isSignUp ? (
                        <Link to="/signin" className="auth-links__link">
                            Войти
                        </Link>
            ) : (
                <Link to="/signup" className="auth-links__link">
                    Регистрация
                </Link>
                )

            }
    </div>
    );
}

export { AuthLink };