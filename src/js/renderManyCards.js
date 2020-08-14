import refs from './refs';
import tempCard from '../templates/tempCard.hbs';
import getGenreNames from './getGenres';

// get custom array films after fetch
export default function renderCard(filmsList) {
  const customList = filmsList.map(elem => {
    elem.release_date = elem.release_date.substr(0, 4);
    elem.genre_ids = getGenreNames(elem.genre_ids).join(', ');

    if (elem.poster_path === null) {
      elem.poster_path = 'https://cutt.ly/bd8IOZ4';
    } else {
      elem.poster_path = `https://image.tmdb.org/t/p/w500/${elem.poster_path}`;
    }
    return elem;
  });

  refs.listFilms.insertAdjacentHTML('beforeend', tempCard(customList));
}
