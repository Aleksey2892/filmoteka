import refs from './refs';
import tempCard from '../templates/tempCard.hbs';

export default function renderLibraryCardList(arr) {
  const updateList = arr.map(elem => {
    if (elem.poster_path === null) {
      elem.poster_path =
        'https://www.indulgemassager.com/assets/frontend/indulge/images/no-profile-pic.jpg';
    } else {
      elem.poster_path = `https://image.tmdb.org/t/p/w500/${elem.poster_path}`;
    }
    if (elem.genre_ids == '') {
      elem.genre_ids = 'no genres';
    } else {
      elem.genre_ids = elem.genres.map(el => el.name);
    }
    if (elem.release_date == '' || elem.release_date === undefined) {
      elem.release_date = 'no info';
    } else {
      elem.release_date = elem.release_date.substr(0, 4);
    }

    return elem;
  });
  refs.listFilms.insertAdjacentHTML('beforeend', tempCard(updateList));
}
