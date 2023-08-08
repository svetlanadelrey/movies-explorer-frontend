import './SearchForm.css';
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
    return (
        <section className="search-movie">
            <form className="search-movie__form">
                <div className="search-movie__input-container">
                    <input
                        className="search-movie__input"
                        type="text"
                        placeholder="Фильм"
                        required
                    />
                    <button className="search-movie__button" type="submit">Найти</button>
                </div>
                <FilterCheckbox />
            </form>
            
        </section>
    );
}
export { SearchForm };