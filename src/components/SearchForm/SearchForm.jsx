import { useState } from 'react';
import './SearchForm.css';
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox';

function SearchForm({handleSearchByKeyword, isShortMovies, handleShortMoviesToggle}) {
    const [keyword, setKeyword] = useState("");
    const [error, setError] = useState("");
    
    const handleInputChange = (e) => {
        setKeyword(e.target.value);
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (keyword.trim().length === 0) {
          setError("Нужно ввести ключевое слово");
        } else {
          setError("");
          handleSearchByKeyword(keyword, isShortMovies);
        }
      };

    return (
        <section className="search-movie">
            <form 
                className="search-movie__form" 
                onSubmit={handleSubmit} 
                noValidate
            >
                <div className="search-movie__input-container">
                    <input
                        className={`search-movie__input ${error ? 'search-movie__input_error' : ''}`}
                        type="text"
                        autoComplete="off"
                        placeholder={error || "Фильм"}
                        value={keyword || ""}
                        onChange={handleInputChange}
                        required
                    />
                    <button className="search-movie__button" type="submit">Найти</button>
                </div>
                <FilterCheckbox 
                    checked={isShortMovies}
                    handleShortMoviesToggle={handleShortMoviesToggle}
                />
            </form>
        </section>
    );
}
export { SearchForm };