export const filterMovies = (movies, keyword) => {
  const filteredMovies = movies.filter((movie) => {
    const lowercaseKeyword = keyword.toLowerCase().trim();

    const lowercaseTitleRU = String(movie.nameRU).toLowerCase();
    const lowercaseTitleEN = String(movie.nameEN).toLowerCase();
    
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