import refs from './refs';
import cardFetch from './oneCardFetch';
import onefilmCard from '../templates/onefilmCard.hbs';
import tempCard from '../templates/tempCard.hbs';
import clearPage from './clearPage';
import dataFromLocal from './dataFromLocal';
import { users } from './defaultLoadLocal';
import notification from 'toastr';
import refsButton from './refs-buttons';
import { addToWatched, addToQueue } from './functionsAddedToLib';
import btnAddDicabled from './btnAddDicabled';

export let oneCardObj = {};

export function getLocal(key) {
  return JSON.parse(localStorage.getItem(key));
}

function addToLocal() {
  const whoOnline = localStorage.getItem('isOnline');
  const localUsers = getLocal('users');

  if (whoOnline === 'no one is online') {
    notification['info']('You are not registred', 'Info');
  } else {
    addToWatched(whoOnline, localUsers);
    addToQueue(whoOnline, localUsers);
  }
}

refs.listFilms.addEventListener('click', event => {
  if (event.target.nodeName === 'IMG' || event.target.nodeName === 'H3') {
    cardFetch(event.target.dataset.id).then(obj => {
      // забираем обьект
      oneCardObj = obj;

      if (obj.poster_path === null) {
        obj.poster_path =
          'https://www.indulgemassager.com/assets/frontend/indulge/images/no-profile-pic.jpg';
      } else {
        obj.poster_path = `https://image.tmdb.org/t/p/w500${obj.poster_path}`;
      }

      clearPage();

      refsButton.homeBg.classList.remove('section-top');
      refsButton.homeBg.classList.add('section-top-details');

      refs.pagination.classList.add('not-visible');
      refs.listFilms.insertAdjacentHTML('beforeend', onefilmCard(obj));

      // тут новый код
      //-------------------------------------------------------------

      btnAddDicabled();
      //---------------------------------------------------------------
      // тут новый когд кончился

      document
        .querySelector('.buttons__block')
        .addEventListener('click', addToLocal);
    });
  }
});
