import { useState} from 'react';
import './SearchForm.css';
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox';

function SearchForm({searchMovies, setKeyword, keyword, onCheckbox, shortMovieCheckbox}) {
    
    
    const handleInputChange = (e) => {
        setKeyword(e.target.value);
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();

          searchMovies();
        
    };

    return (
        <section className="search-movie">
            <form 
                className="search-movie__form" 
                name="search"
                noValidate
            >
                <div className="search-movie__input-container">
                    <input
                        className='search-movie__input'
                        type="text"
                        autoComplete="off"
                        placeholder={"Фильм"}
                        value={keyword}
                        id="search"
                        onChange={handleInputChange}
                        required
                    />
                    <button className="search-movie__button" type="submit" onClick={handleSubmit}>Найти</button>
                </div>
                <FilterCheckbox 
                    onCheckbox={onCheckbox}
                    shortMovieCheckbox={shortMovieCheckbox}
                />
            </form>
        </section>
    );
}
export { SearchForm };