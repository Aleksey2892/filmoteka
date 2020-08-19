import { oneCardObj, getLocal } from './renderSingleCard';

export function btnAddDicabledWatched() {
  const whoOnline = localStorage.getItem('isOnline');
  const allUsers = getLocal('users');

  const elUser = allUsers.find(el => {
    if (el.userName === whoOnline) {
      console.log(el);
      return el;
    }
  });

  const btnW = document.querySelector('.add_watched');

  // //!
  console.log(whoOnline);
  if (whoOnline === 'no one is online') {
    console.log('ДА, никого нет онлайн');
    return;
  } else {
    elUser.lib.watched.results.find(el => {
      if (el.id === oneCardObj.id) {
        console.log('изменить кнопку');

        btnW.classList.add('active');
        btnW.setAttribute('disabled', true);
      }
    });

    if (btnW.getAttribute('disabled')) {
      btnW.textContent = 'Added in Watched';
    }
  }
  // //!

  // elUser.lib.watched.results.find(el => {
  //   if (el.id === oneCardObj.id) {
  //     console.log('изменить кнопку');

  //     btnW.classList.add('active');
  //     btnW.setAttribute('disabled', true);
  //   }
  // });

  // if (btnW.getAttribute('disabled')) {
  //   btnW.textContent = 'Added in Watched';
  // }
}

export function btnAddDicabledQueue() {
  const whoOnline = localStorage.getItem('isOnline');
  const allUsers = getLocal('users');

  const elUser = allUsers.find(el => {
    if (el.userName === whoOnline) {
      console.log(el);
      return el;
    }
  });

  const btnW = document.querySelector('.add_queue');

  // //!
  console.log(whoOnline);
  if (whoOnline === 'no one is online') {
    console.log('ДА, никого нет онлайн');
    return;
  } else {
    elUser.lib.queue.results.find(el => {
      if (el.id === oneCardObj.id) {
        console.log('изменить кнопку');

        btnW.classList.add('active');
        btnW.setAttribute('disabled', true);
      }
    });

    if (btnW.getAttribute('disabled')) {
      btnW.textContent = 'Added in Queue';
    }
  }
  // //!

  // elUser.lib.queue.results.find(el => {
  //   if (el.id === oneCardObj.id) {
  //     console.log('изменить кнопку');

  //     btnW.classList.add('active');
  //     btnW.setAttribute('disabled', true);
  //   }
  // });

  // if (btnW.getAttribute('disabled')) {
  //   btnW.textContent = 'Added in Queue';
  // }
}

// -------------------------------- added now
export function addNowWatched() {
  const btnW = document.querySelector('.add_watched');

  btnW.classList.add('active');
  btnW.setAttribute('disabled', true);

  if (btnW.getAttribute('disabled')) {
    btnW.textContent = 'Added in Watched';
  }
}

// ----------------------------------------
// -------------------------------- added now
export function addNowQueue() {
  const btnW = document.querySelector('.add_queue');

  btnW.classList.add('active');
  btnW.setAttribute('disabled', true);

  if (btnW.getAttribute('disabled')) {
    btnW.textContent = 'Added in Queue';
  }
}
// ----------------------------------------
