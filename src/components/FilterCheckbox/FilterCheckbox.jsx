import './FilterCheckbox.css';

function FilterCheckbox() {
    return (
        <div className="filter-checkbox">
                <input
                    type="checkbox"
                    className="filter-checkbox__input"
                    id="filter-checkbox"
                />
            <label for="filter-checkbox" className="filter-checkbox__label">Короткометражки</label>
        </div>
    );
}

export { FilterCheckbox };