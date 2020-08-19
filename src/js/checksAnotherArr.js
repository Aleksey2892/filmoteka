import { userElement, oneCardObj } from './functionsAddedToLib';
import notification from 'toastr';
import {
  btnAddDicabledWatched,
  btnAddDicabledQueue,
  addNowWatched,
  addNowQueue,
} from './btnAddDicabled';

export function checksAnotherArrForWatched(
  userElement,
  oneCardObj,
  localUsers,
) {
  //!

  if (userElement.lib.queue.results.length === 0) {
    userElement.lib.watched.results.push(oneCardObj);

    btnAddDicabledWatched();
    addNowWatched();

    localStorage.setItem('users', JSON.stringify(localUsers));

    // notification['success']('You added a movie to Watched', 'Great');
  }
  //!

  const elemenOfArr = userElement.lib.queue.results.find(el => {
    if (el.id === oneCardObj.id) {
      console.log('в Q есть такой', 'elId', el.id, oneCardObj.id);

      const btnW = document.querySelector('.add_queue');

      btnW.removeAttribute('disabled');
      btnW.textContent = ' Add to Queue';

      return el;
    } else {
      return false;
    }
  });

  //* вернет index эелемента
  const idx = userElement.lib.queue.results.indexOf(elemenOfArr);
  console.log(idx);

  if (idx === -1) {
    console.log('idx:', idx);
  } else {
    console.log(userElement.lib.queue.results.length);
    //* удалит элемент
    userElement.lib.queue.results.splice(idx, 1);
    console.log(userElement.lib.queue.results.length);
  }

  // console.log(userElement.lib.queue.results.length);
  // //* удалит элемент
  // userElement.lib.queue.results.splice(idx, 1);
  // console.log(userElement.lib.queue.results.length);
}

export function checksAnotherArrForQueue(userElement, oneCardObj, localUsers) {
  //!

  if (userElement.lib.watched.results.length === 0) {
    userElement.lib.queue.results.push(oneCardObj);

    btnAddDicabledQueue();
    addNowQueue();

    localStorage.setItem('users', JSON.stringify(localUsers));

    notification['success']('You added a movie to Queue', 'Great');
  }
  //!

  const elemenOfArr = userElement.lib.watched.results.find(el => {
    if (el.id === oneCardObj.id) {
      const btnQ = document.querySelector('.add_watched');

      btnQ.removeAttribute('disabled');
      btnQ.textContent = ' Add to Watched';

      return el;
    } else {
      return false;
    }
  });

  //* вернет index эелемента
  const idx = userElement.lib.watched.results.indexOf(elemenOfArr);
  console.log(idx);

  if (idx === -1) {
    console.log('idx:', idx);
  } else {
    console.log(userElement.lib.watched.results.length);
    //* удалит элемент
    userElement.lib.watched.results.splice(idx, 1);
    console.log(userElement.lib.watched.results.length);
  }

  // console.log(userElement.lib.queue.results.length);
  // //* удалит элемент
  // userElement.lib.queue.results.splice(idx, 1);
  // console.log(userElement.lib.queue.results.length);
}

// export function checksAnotherArrForQueue(userElement, oneCardObj, localUsers) {
//   if (userElement.lib.watched.results.length === 0) {
//     userElement.lib.queue.results.push(oneCardObj);

//     btnAddDicabledWatched();
//     addNowWatched();

//     localStorage.setItem('users', JSON.stringify(localUsers));

//     // notification['success']('You added a movie to Queue', 'Great');
//   }

//   const elemenOfArr = userElement.lib.watched.results.find(el => {
//     if (el.id === oneCardObj.id) {
//       console.log('в W есть такой', 'elId', el.id, oneCardObj.id);
//       document.querySelector('.add_watched').removeAttribute('disabled');
//       return el;
//     }
//   });

//   //* вернет index эелемента
//   const idx = userElement.lib.watched.results.indexOf(elemenOfArr);
//   console.log(idx);

//   console.log(userElement.lib.watched.results.length);
//   //* удалит элемент
//   userElement.lib.watched.results.splice(idx, 1);
//   console.log(userElement.lib.watched.results.length);
// }
