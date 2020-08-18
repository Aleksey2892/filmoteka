import refs from './refs';
import cardFetch from './oneCardFetch';
import onefilmCard from '../templates/onefilmCard.hbs';
import tempCard from '../templates/tempCard.hbs';
import clearPage from './clearPage';
import dataFromLocal from './dataFromLocal';
import { users } from './defaultLoadLocal';
import notification from 'toastr';
import refsButton from './refs-buttons';

// let test = {
//   watched: [],
//   queue: [],
// };

// if (dataFromLocal()) {
//   test.watched = dataFromLocal();
//   console.log(test.watched);
// }

// refs.watchedBtn.addEventListener('click', ev => {
//   clearPage();
//   console.log(ev);

//   //RENDER CARD+++++++++++++++++++++getting data with changes for template------------use template
//   const updateList = test.watched.map(elem => {
//     if (elem.poster_path === null) {
//       elem.poster_path =
//         'https://www.indulgemassager.com/assets/frontend/indulge/images/no-profile-pic.jpg';
//     } else {
//       elem.poster_path = `https://image.tmdb.org/t/p/w500${elem.poster_path}`;
//     }
//     if (elem.genre_ids == '') {
//       elem.genre_ids = 'no genres';
//     } else {
//       elem.genre_ids = elem.genres.map(el => el.name);
//     }
//     if (elem.release_date == '' || elem.release_date === undefined) {
//       elem.release_date = 'no info';
//     } else {
//       elem.release_date = elem.release_date.substr(0, 4);
//     }

//     return elem;
//   });

//   refs.listFilms.insertAdjacentHTML('beforeend', tempCard(updateList));
// });

let oneCardObj = {};

function getLocal(key) {
  return JSON.parse(localStorage.getItem(key));
}

function addToLocal() {
  // console.log(oneCardObj);
  const whoOnline = localStorage.getItem('isOnline');

  if (whoOnline === 'no one is online') {
    //
    notification['info']('You are not registred', 'Info');
  } else {
    if (event.target.classList.contains('add_watched')) {
      console.log('add_watched');

      const localUsers = getLocal('users');

      localUsers.find(user => {
        if (user.userName === whoOnline) {
          console.log('нашли', user.userName);

          user.lib.watched.push(oneCardObj);
        }
      });

      localStorage.setItem('users', JSON.stringify(localUsers));
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
