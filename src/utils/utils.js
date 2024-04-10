import { MAX_DURATION } from "./constants";

export const filterMovies = (movies, keyword, checkbox) => {
  return movies.filter((movie) =>
    checkbox
      ? movie.duration <= MAX_DURATION &&
        (String(movie.nameRU).toLowerCase().includes(keyword.toLowerCase()) || String(movie.nameEN).toLowerCase().includes(keyword.toLowerCase()))
      : (String(movie.nameRU).toLowerCase().includes(keyword.toLowerCase()) || String(movie.nameEN).toLowerCase().includes(keyword.toLowerCase()))
      );
};

export const calculateMovieDuration = value => {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  let calculatedDuration = `${hours}ч ${minutes}м`;
  if (hours === 0) calculatedDuration = `${minutes}м`;
  if (minutes === 0) calculatedDuration = `${hours}ч`;
  return calculatedDuration;
};