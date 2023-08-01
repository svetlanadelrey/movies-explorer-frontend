import './Logo.css';
import logo from '../../images/header_logo.svg';
import { Link } from 'react-router-dom';

function Logo() {
    return (
        <Link className="logo__link" to="/">
            <img
                className="logo"
                src={logo}
                alt="Логотип"
            />
        </Link>
    );
}

export { Logo };