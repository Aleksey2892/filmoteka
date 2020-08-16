import refs from './refs';
import cardFetch from './oneCardFetch';
import onefilmCard from '../templates/onefilmCard.hbs';
import clearPage from './clearPage';

let watched = [];

refs.listFilms.addEventListener('click', event => {
  //   console.log(event.currentTarget); //ul

  if (event.target.nodeName === 'IMG' || event.target.nodeName === 'H3') {
    cardFetch(event.target.dataset.id).then(obj => {
      clearPage();
      refs.listFilms.insertAdjacentHTML('beforeend', onefilmCard(obj));

      refs.listFilms
        .querySelector('.buttons__block')
        .addEventListener('click', event => {
          console.log(event.target);

          if (event.target.classList.contains('add_queue')) {
            console.log('ok');
          } else if (event.target.classList.contains('add_watched')) {
            console.log(event.target.parentElement.dataset.id);
            pushLocalArr(event.target.parentElement.dataset.id);
            localStorage.setItem('watched', JSON.stringify(watched));
          }
        });
    });
    // console.log(event);
  }
});

// refs.addForLibrary

function pushLocalArr(watchedItem) {
  watched.push(watchedItem);
  console.log(watched);
}

// function onclickAddWatched(className, watched) {
// //   if (className === 'onefilm__btn add_watched') {
//     // console.log(id);
//     console.log(className);

//     console.log(`'in localPage create' ${watched}`);
//     localStorage.setItem('watched', JSON.stringify(watched));
// //   }
// }
