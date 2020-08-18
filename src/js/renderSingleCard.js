import refs from './refs';
import cardFetch from './oneCardFetch';
import onefilmCard from '../templates/onefilmCard.hbs';
import tempCard from '../templates/tempCard.hbs';
import clearPage from './clearPage';
import dataFromLocal from './dataFromLocal';
import { users } from './defaultLoadLocal';
import notification from 'toastr';

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

      refs.pagination.classList.add('not-visible');
      refs.listFilms.insertAdjacentHTML('beforeend', onefilmCard(obj));

      // забираем обьект
      oneCardObj = obj;

      document
        .querySelector('.buttons__block')
        .addEventListener('click', addToLocal);
      /////////////////////////////////////////////////////////////////////
      //add Arr to localstorage
      //listener for card btns
      // refs.listFilms
      //   .querySelector('.buttons__block')
      //   .addEventListener('click', event => {
      //     console.log('on click btn in card:', event.target);
      //     //for watched
      //     if (event.target.classList.contains('add_watched')) {
      //       pushLocalArr(obj, 'watched');
      //       console.log(pushLocalArr(obj, 'watched'));
      //       localStorage.setItem('test', JSON.stringify(test));
      //     }
      //     if (event.target.classList.contains('add_queue')) {
      //       // pushLocalArr(obj, 'queue');

      //       if (test[0].queue.length < 1) {
      //         console.log('add first');
      //         return test[0].queue.push(obj);
      //       } else {
      //         //пройтись по массиву искать совпадения. !!!!!
      //         const sameItem = test[0].queue.find(el => el === obj);
      //         if (sameItem) {
      //           console.log('Selected'); //добавить в кнопку

      //           //если нет совпадений, то добавить в массив
      //         } else {
      //           console.log('add more');
      //           return test[0].queue.push(obj);
      //         }
      //       }

      //       console.log(pushLocalArr(obj, 'queue'));

      //       localStorage.setItem('test', JSON.stringify(test));
      //     }
      //   });
    });
  }
});

// export let test = {
//   watched: [],
//   queue: [],
// };

// function pushLocalArr(item, arrName) {
//   console.log('vfc', test);

//   //   if (arrName === 'watched') {
//   //если массив пустой:
//   if (test[0].watched.length < 1) {
//     console.log('add first');
//     return test[0].watched.push(item);
//   } else {
//     //пройтись по массиву искать совпадения. !!!!!
//     const sameItem = test[0].watched.find(el => el === item);
//     if (sameItem) {
//       console.log('Selected'); //добавить в кнопку

//       //если нет совпадений, то добавить в массив
//     } else {
//       console.log('add more');
//       return test[0].watched.push(item);
//     }
//   }
//   } else {
//     if (test.queue.length < 1) {
//       console.log('add first');
//       return test.queue.push(item);
//     } else {
//       //пройтись по массиву искать совпадения. !!!!!
//       const sameItem = test.queue.find(el => el === item);
//       if (sameItem) {
//         console.log('Selected'); //добавить в кнопку

//         //если нет совпадений, то добавить в массив
//       } else {
//         console.log('add more');
//         return test.queue.push(item);
//       }
//     }
//   }
// }
