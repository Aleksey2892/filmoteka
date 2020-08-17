import refs from './refs';
import cardFetch from './oneCardFetch';
import onefilmCard from '../templates/onefilmCard.hbs';
import tempCard from '../templates/tempCard.hbs';
import clearPage from './clearPage';
import dataFromLocal from './dataFromLocal';

let savedListFilms = {
  watched: [],
  queue: [],
};

if (dataFromLocal()) {
  savedListFilms.watched = dataFromLocal();
  console.log(savedListFilms.watched);
}

refs.watchedBtn.addEventListener('click', ev => {
  clearPage();
  console.log(ev);

  //RENDER CARD+++++++++++++++++++++getting data with changes for template------------use template
  const updateList = savedListFilms.watched.map(elem => {
    if (elem.poster_path === null) {
      elem.poster_path =
        'https://www.indulgemassager.com/assets/frontend/indulge/images/no-profile-pic.jpg';
    } else {
      elem.poster_path = `https://image.tmdb.org/t/p/w500${elem.poster_path}`;
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
});

refs.listFilms.addEventListener('click', event => {
  if (event.target.nodeName === 'IMG' || event.target.nodeName === 'H3') {
    cardFetch(event.target.dataset.id).then(obj => {
      clearPage();
      refs.pagination.classList.add('not-visible');
      refs.listFilms.insertAdjacentHTML('beforeend', onefilmCard(obj));
      /////////////////////////////////////////////////////////////////////
      //add Arr to localstorage
      //listener for card btns
      refs.listFilms
        .querySelector('.buttons__block')
        .addEventListener('click', event => {
          console.log('on click btn in card:', event.target);
          //for watched
          if (event.target.classList.contains('add_watched')) {
            pushLocalArr(obj, 'watched');
            localStorage.setItem(
              'savedListFilms',
              JSON.stringify(savedListFilms.watched),
            );
          }
          if (event.target.classList.contains('add_queue')) {
            pushLocalArr(obj, 'queue');
            localStorage.setItem(
              'savedListFilms',
              JSON.stringify(savedListFilms.queue),
            );
          }
        });
    });
  }
});

function pushLocalArr(item, arrName) {
  console.log(arrName);
  //   if (arrName === 'watched') {
  //если массив пустой:
  if (savedListFilms.watched.length < 1) {
    console.log('add first');
    return savedListFilms.watched.push(item);
  } else {
    //пройтись по массиву искать совпадения. !!!!!
    const sameItem = savedListFilms.watched.find(el => el === item);
    if (sameItem) {
      console.log('Selected'); //добавить в кнопку

      //если нет совпадений, то добавить в массив
    } else {
      console.log('add more');
      return savedListFilms.watched.push(item);
    }
  }
  //   } else {
  //     if (savedListFilms.queue.length < 1) {
  //       console.log('add first');
  //       return savedListFilms.queue.push(item);
  //     } else {
  //       //пройтись по массиву искать совпадения. !!!!!
  //       const sameItem = savedListFilms.queue.find(el => el === item);
  //       if (sameItem) {
  //         console.log('Selected'); //добавить в кнопку

  //         //если нет совпадений, то добавить в массив
  //       } else {
  //         console.log('add more');
  //         return savedListFilms.queue.push(item);
  //       }
  //     }
  //   }
}
