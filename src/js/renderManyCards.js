import refs from './refs';
import tempCard from '../templates/tempCard.hbs';
import getGenreNames from './getGenres';

// get custom array films after fetch
export default function renderCard(filmsList) {
  const customList = filmsList.map(elem => {
    //for no img
    if (elem.poster_path === null) {
      elem.poster_path =
        'https://www.indulgemassager.com/assets/frontend/indulge/images/no-profile-pic.jpg';
    } else {
      elem.poster_path = `https://image.tmdb.org/t/p/w500/${elem.poster_path}`;
    }

    //for no genre
    if (elem.genre_ids == '') {
      elem.genre_ids = 'no genres';
    } else {
      elem.genre_ids = getGenreNames(elem.genre_ids).join(', ');
    }

    // for no year
    if (elem.release_date == '') {
      elem.release_date = 'unknown';
    } else {
      elem.release_date = elem.release_date.substr(0, 4);
    }

    return elem;
  });

  refs.listFilms.insertAdjacentHTML('beforeend', tempCard(customList));
}
