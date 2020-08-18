import refs from './refs-buttons.js';
import clearPage from './clearPage';
import startFetch from './startFetch';
import { renderWithTimeout } from './gallery';
import refsButtons from './refs-buttons';

const openMyLibrary = () => {
  refs.searchBox.classList.add('visually-hidden');
  refs.error.classList.remove('error-visible');
  refs.myWatched.classList.remove('visually-hidden');
  refs.myQueue.classList.remove('visually-hidden');
  refs.myWatched.classList.add('active');
  refs.myQueue.classList.remove('active');
  refs.homeBg.classList.add('section-top-lib');
  refs.linkHome.classList.remove('active-menu');
  refs.linkLib.classList.add('active-menu');

  // учистит UL и скрывает пагинацию при нажатии на my library
  document.querySelector('#pagination').classList.add('not-visible');
  clearPage();
};

const closeMyLibrary = e => {
  refs.searchBox.classList.remove('visually-hidden');
  refs.myWatched.classList.add('visually-hidden');
  refs.myQueue.classList.add('visually-hidden');
  refs.homeBg.classList.remove('section-top-lib');
  refs.myWatched.classList.remove('active');
  refs.myQueue.classList.remove('active');
  refs.linkLib.classList.remove('active-menu');
  refs.linkHome.classList.add('active-menu');

  // console.log(e.target);

  // const test = document.querySelector('.films-list');

  // console.log(test);
  // if (refs.listFilms.textContent === '') {
  //   console.log('пусто');
  // }

  startFetch().then(data => {
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

export default { openMyLibrary, closeMyLibrary, openWatched, openQueue };
