import './FilterCheckbox.css';

function FilterCheckbox({isShortMovies, handleShortMoviesToggle}) {

    return (
        <div className="filter-checkbox">
                <input
                    type="checkbox"
                    className="filter-checkbox__input"
                    id="filter-checkbox"
                    checked={isShortMovies}
                    onChange={handleShortMoviesToggle}
                />
            <label htmlFor="filter-checkbox" className="filter-checkbox__label">Короткометражки</label>
        </div>
    );
}

export { FilterCheckbox };