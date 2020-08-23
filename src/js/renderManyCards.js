import refs from './refs';
import tempCard from '../templates/tempCard.hbs';
import { getGenreNames } from './getGenres';

// get custom array films after fetch
export default function renderCard(data) {
  const filmsList = data[0];
  const genre_names = data[1];

  const customList = filmsList.map(elem => {
    //for no img
    if (elem.poster_path === null) {
      elem.poster_path =
        'https://www.indulgemassager.com/assets/frontend/indulge/images/no-profile-pic.jpg';
    } else {
      if (elem.poster_path[0] === '/') {
        elem.poster_path = `https://image.tmdb.org/t/p/w500${elem.poster_path}`;
      } else {
        elem.poster_path = elem.poster_path;
      }
    }

    //for no genre
    if (elem.genre_ids == '') {
      elem.genre_ids = 'no genres';
    } else {
      // new rules for single card render
      if (elem.genre_ids) {
        elem.genre_ids = getGenreNames(elem.genre_ids, genre_names).join(' ');
      } else if (elem.genres) {
        elem.genre_ids = elem.genres.map(el => el.name).join(' ');
      }
    }

    // for no year
    if (elem.release_date == '' || elem.release_date === undefined) {
      elem.release_date = 'no info';
    } else {
      elem.release_date = elem.release_date.substr(0, 4);
    }

    return elem;
  });

  refs.listFilms.insertAdjacentHTML('beforeend', tempCard(customList));
}
