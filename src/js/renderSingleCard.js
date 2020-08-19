import refs from './refs';
import cardFetch from './oneCardFetch';
import onefilmCard from '../templates/onefilmCard.hbs';
import tempCard from '../templates/tempCard.hbs';
import clearPage from './clearPage';
import dataFromLocal from './dataFromLocal';
import { users } from './defaultLoadLocal';
import notification from 'toastr';
import refsButton from './refs-buttons';

let oneCardObj = {};

export function getLocal(key) {
  return JSON.parse(localStorage.getItem(key));
}

function addToLocal() {
  let user;
  const whoOnline = localStorage.getItem('isOnline');

  if (whoOnline === 'no one is online') {
    notification['info']('You are not registred', 'Info');
  } else {
    if (event.target.classList.contains('add_watched')) {
      console.log('ты под логином. нажал на кнопку добавить');

      const localUsers = getLocal('users');

      const userElement = localUsers.find(el => {
        if (el.userName === whoOnline) {
          return el;
        } else {
          return false;
        }
      });

      if (userElement.lib.watched.length === 0) {
        console.log('пусто и пушим первый элемент');

        userElement.lib.watched.push(oneCardObj);

        localStorage.setItem('users', JSON.stringify(localUsers));
      } else {
        const isFilm = userElement.lib.watched.find(el => {
          if (el.id === oneCardObj.id) {
            console.log('есть такой');
            return true;
          }
        });

        if (!isFilm) {
          userElement.lib.watched.push(oneCardObj);

          localStorage.setItem('users', JSON.stringify(localUsers));
        }
      }
    }

    if (event.target.classList.contains('add_queue')) {
      console.log('add_queue');

      const localUsers = getLocal('users');

      localUsers.find(user => {
        if (user.userName === whoOnline) {
          console.log('нашли', user.userName);

          user.lib.queue.push(oneCardObj);
        }
      });

      localStorage.setItem('users', JSON.stringify(localUsers));
    }
  }
}

refs.listFilms.addEventListener('click', event => {
  if (event.target.nodeName === 'IMG' || event.target.nodeName === 'H3') {
    cardFetch(event.target.dataset.id).then(obj => {
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

      // забираем обьект
      oneCardObj = obj;

      document
        .querySelector('.buttons__block')
        .addEventListener('click', addToLocal);
    });
  }
});
