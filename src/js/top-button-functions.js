import refsButtons from './refs-buttons.js';
import clearPage from './clearPage';
import startFetch from './startFetch';
import renderWithTimeout from './renderWithTimeout';
import getLocal from './getLocal';
import refs from './refs.js';

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

  //! loading Watched default on click My-Library
  testClickW();
};

//// ===============================================================================

//! added visible close btn ( for film-card)
//! added not-visible pagination in My-Library
function classAddRemove() {
  setTimeout(() => {
    if (document.querySelector('.close-btn')) {
      const allCloseBtnArr = document.querySelectorAll('.close-btn');

      allCloseBtnArr.forEach(el => {
        el.classList.remove('not-visible');
      });

      console.log(allCloseBtnArr);
    }

    document.querySelector('#pagination').classList.add('not-visible');
  }, 1005);
}

//// ===============================================================================

//! get User element
function getObjOnlineUser() {
  const arrData = getLocal('users');
  const whoOnline = localStorage.getItem('isOnline');

  const dataUser = arrData.find(el => {
    if (el.userName === whoOnline) {
      return el;
    }
  });

  return dataUser;
}
//!

//// ===============================================================================
//! render Watched
function testClickW() {
  clearPage();
  refsButtons.homeBg.classList.add('section-top-lib');
  refsButtons.homeBg.classList.add('section-top');
  refsButtons.homeBg.classList.remove('section-top-details');

  const dataUser = getObjOnlineUser();
  renderWithTimeout(dataUser.lib.watched);
  classAddRemove();
}

//! render Queue
function testClickQ() {
  clearPage();
  refsButtons.homeBg.classList.add('section-top-lib');
  refsButtons.homeBg.classList.add('section-top');
  refsButtons.homeBg.classList.remove('section-top-details');

  const dataUser = getObjOnlineUser();
  renderWithTimeout(dataUser.lib.queue);
  classAddRemove();
}
//// ===============================================================================

const closeMyLibrary = e => {
  refsButtons.homeBg.classList.remove('section-top-details');
  refsButtons.sectionBg.classList.add('section-top');
  refsButtons.searchBox.classList.remove('visually-hidden');
  refsButtons.myWatched.classList.add('visually-hidden');
  refsButtons.myQueue.classList.add('visually-hidden');
  refsButtons.homeBg.classList.remove('section-top-lib');
  refsButtons.myWatched.classList.remove('active');
  refsButtons.myQueue.classList.remove('active');
  refsButtons.linkLib.classList.remove('active-menu');
  refsButtons.linkHome.classList.add('active-menu');

  //! render on click btn HOME
  startFetch().then(data => {
    console.log(data);
    clearPage();
    renderWithTimeout(data);

    document.querySelector('#pagination').classList.remove('not-visible');
  });
};

const openWatched = () => {
  refsButtons.myWatched.classList.add('active');
  refsButtons.myQueue.classList.remove('active');

  testClickW();
};

const openQueue = () => {
  refsButtons.myWatched.classList.remove('active');
  refsButtons.myQueue.classList.add('active');

  testClickQ();
};

export default { openMyLibrary, closeMyLibrary, openWatched, openQueue };
