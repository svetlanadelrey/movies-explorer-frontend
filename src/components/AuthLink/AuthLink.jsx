import './AuthLink.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function AuthLink({title}) {
    const location = useLocation();
    const isSignUp = location.pathname === "/signup";
    
    return (
        <div className="auth__link-container">
            <p className="auth__link-title">{title}</p>
            {isSignUp ? (
                        <Link to="/signup" className="auth__link">
                            Войти
                        </Link>
            ) : (
                <Link to="/signin" className="auth__link">
                    Регистрация
                </Link>
                )

            }
    </div>
    );
}

export { AuthLink };