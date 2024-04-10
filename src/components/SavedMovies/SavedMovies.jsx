import './SavedMovies.css';
import { Header } from '../Header/Header';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { Footer } from '../Footer/Footer';

function SavedMovies({
  movies,
  searchMovies,
  setSearchedMovies,
  setKeywordMovies,
  keywordMovies,
  onCheckbox,
  shortMovieCheckbox,
  onDeleteMovie,
  isMovieSaved,
}) {

    return (
        <>
        <Header />
        <main>
            <SearchForm
                searchMovies={searchMovies}
                setSearchedMovies={setSearchedMovies}
                setKeywordMovies={setKeywordMovies}
                keywordMovies={keywordMovies}
                onCheckbox={onCheckbox}
                shortMovieCheckbox={shortMovieCheckbox}
            />
            <MoviesCardList     
                movies={movies}
                isMovieSaved={isMovieSaved}
                onDeleteMovie={onDeleteMovie}
            />           
        </main>
        <Footer />
        </>
    );
}

export { SavedMovies };