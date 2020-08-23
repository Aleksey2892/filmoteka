import { api_key } from './startFetch';
import axios from 'axios';
axios.defaults.baseURL = `https://api.themoviedb.org/3`;
export function getGenreNames(arrIds, genre_names) {
  const findId = arrIds.map(id => {
    return genre_names.find(el => {
      if (el.id === id) {
        return el.name;
      }
    });
  });

  const getName = findId.map(elem => {
    return elem.name;
  });

  return getName;
}
export const genres = axios
  .get(`/genre/movie/list?api_key=${api_key}`)
  .then(data => data.data.genres);
