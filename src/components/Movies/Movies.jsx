import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import Preloader from '../Preloader/Preloader';

function Movies({
  movies,
  searchMovies,
  setKeywordMovies,
  setSearchedMovies,
  keywordMovies,
  onCheckbox,
  shortMovieCheckbox,
  onSaveMovie,
  onDeleteMovie,
  isMovieSaved,
  errorMessage,
  preloader,
}) {
    return (
        <>
        <Header />
        <main>
            <SearchForm 
              searchMovies={searchMovies}
              setKeywordMovies={setKeywordMovies}
              setSearchedMovies={setSearchedMovies}
              keywordMovies={keywordMovies}
              onCheckbox={onCheckbox}
              shortMovieCheckbox={shortMovieCheckbox}
            />
            {preloader ? 
              (<Preloader />) :
                (<MoviesCardList
                  movies={movies}
                  onSaveMovie={onSaveMovie}
                  onDeleteMovie={onDeleteMovie}
                  isMovieSaved={isMovieSaved}
                  errorMessage={errorMessage}
                />)
            }                 
        </main>
        <Footer />
        </>
    );
}

export { Movies };