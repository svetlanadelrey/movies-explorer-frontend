import './FilterCheckbox.css';

function FilterCheckbox({shortMovieCheckbox, onCheckbox}) {

    return (
        <div className="filter-checkbox">
                <input
                    type="checkbox"
                    className="filter-checkbox__input"
                    id="filter-checkbox"
                    checked={shortMovieCheckbox}
                    onChange={onCheckbox}
                />
            <label htmlFor="filter-checkbox" className="filter-checkbox__label">Короткометражки</label>
        </div>
    );
}

export { FilterCheckbox };