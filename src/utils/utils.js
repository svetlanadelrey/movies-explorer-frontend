export const filterMovies = (movies, keyword) => {
    const filteredMovies = movies.filter((movie) => {
      const lowercaseKeyword = keyword.toLowerCase();
  
      const lowercaseTitleRU = movie.nameRU.toLowerCase();
      const lowercaseTitleEN = movie.nameEN.toLowerCase();
  
      return (
        lowercaseTitleRU.includes(lowercaseKeyword) ||
        lowercaseTitleEN.includes(lowercaseKeyword)
      );
    });
  
    return filteredMovies;
  };

export const filterShortMovies = (movies) => {
  const MAX_DURATION = 40;
  return movies.filter((movie) => movie.duration <= MAX_DURATION);
}

export const calculateMovieDuration = value => {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  let calculatedDuration = `${hours}ч ${minutes}м`;
  if (hours === 0) calculatedDuration = `${minutes}м`;
  if (minutes === 0) calculatedDuration = `${hours}ч`;
  return calculatedDuration;
};

// Функция для получения массива savedMovies из localStorage
export const getSavedMoviesFromLocalStorage = () => {
  const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
  return savedMovies;
};
        
// Функция для сохранения массива savedMovies в localStorage
export const saveSavedMoviesToLocalStorage = (savedMovies) => {
  localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
};