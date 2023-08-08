import { MainMenu } from '../MainMenu/MainMenu';
import './Navigation.css';

function Navigation({ loggedIn }) {
    return (
        <nav>
            {loggedIn ? <MainMenu /> : ('')}
        </nav>
    );
}

export { Navigation };