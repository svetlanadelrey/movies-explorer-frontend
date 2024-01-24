import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

function Movies({
  movies,
  searchMovies,
  setKeyword,
  setSearchedMovies,
  keyword,
  onSaveMovie,
  onDeleteMovie,
  isMovieSaved,
  onCheckbox,
  shortMovieCheckbox,
  errorMessage,
}) {
    return (
        <>
        <Header />
        <main>
            <SearchForm 
              searchMovies={searchMovies}
              setKeyword={setKeyword}
              setSearchedMovies={setSearchedMovies}
              keyword={keyword}
              onCheckbox={onCheckbox}
              shortMovieCheckbox={shortMovieCheckbox}
            />        
            
              <MoviesCardList
                movies={movies}
                onSaveMovie={onSaveMovie}
                onDeleteMovie={onDeleteMovie}
                isMovieSaved={isMovieSaved}
                errorMessage={errorMessage}
              />
            
        </main>
        <Footer />
        </>
    );
}

export { Movies };