import refsButtons from './refs-buttons.js';
import clearPage from './clearPage';
import startFetch from './startFetch';
import { renderWithTimeout } from './gallery';
import refs from './refs';
import { getLocal } from './renderSingleCard';
import renderCard from './renderManyCards';
import tempCard from '../templates/tempCard.hbs';

const openMyLibrary = () => {
  refsButtons.searchBox.classList.add('visually-hidden');
  refsButtons.error.classList.remove('error-visible');
  refsButtons.myWatched.classList.remove('visually-hidden');
  refsButtons.myQueue.classList.remove('visually-hidden');
  refsButtons.myWatched.classList.add('active');
  refsButtons.myQueue.classList.remove('active');
  refsButtons.homeBg.classList.add('section-top-lib');
  refsButtons.linkHome.classList.remove('active-menu');
  refsButtons.linkLib.classList.add('active-menu');

  // очистит UL и скрывает пагинацию при нажатии на my library
  document.querySelector('#pagination').classList.add('not-visible');
  clearPage();

  const arrData = getLocal('users');
  const whoOnline = localStorage.getItem('isOnline');
  console.log(whoOnline);

  const dataUser = arrData.find(el => {
    if (el.userName === whoOnline) {
      return el;
    }
  });

  console.log(dataUser.lib.watched);
  renderCard(dataUser.lib.watched);
};

//// ===============================================================================

const closeMyLibrary = e => {
  refsButtons.searchBox.classList.remove('visually-hidden');
  refsButtons.myWatched.classList.add('visually-hidden');
  refsButtons.myQueue.classList.add('visually-hidden');
  refsButtons.homeBg.classList.remove('section-top-lib');
  refsButtons.myWatched.classList.remove('active');
  refsButtons.myQueue.classList.remove('active');
  refsButtons.linkLib.classList.remove('active-menu');
  refsButtons.linkHome.classList.add('active-menu');

  // console.log(e.target);

  // const test = document.querySelector('.films-list');

  // console.log(test);
  // if (refs.listFilms.textContent === '') {
  //   console.log('пусто');
  // }

  startFetch().then(data => {
    console.log(data);
    clearPage();
    renderWithTimeout(data);

    document.querySelector('#pagination').classList.remove('not-visible');
  });
};

const openWatched = () => {
  refs.myWatched.classList.add('active');
  refs.myQueue.classList.remove('active');
};

const openQueue = () => {
  refs.myWatched.classList.remove('active');
  refs.myQueue.classList.add('active');
};

// function selectLib(event) {
//   console.log('hi');
//   console.log(event.target);

// }

export default { openMyLibrary, closeMyLibrary, openWatched, openQueue };
