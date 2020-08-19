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

    notification['success']('You added a movie to Queue', 'Great');
  }
  //!

  const elemenOfArr = userElement.lib.queue.results.find(el => {
    if (el.id === oneCardObj.id) {
      console.log('в q есть такой');
      document.querySelector('.add_queue').removeAttribute('disabled');
      return el;
    }
  });

  //* вернет index эелемента
  const idx = userElement.lib.queue.results.indexOf(elemenOfArr);
  console.log(idx);

  console.log(userElement.lib.queue.results.length);
  //* удалит элемент
  userElement.lib.queue.results.splice(idx, 1);
  console.log(userElement.lib.queue.results.length);
}

export function checksAnotherArrForQueue(userElement, oneCardObj, localUsers) {
  if (userElement.lib.queue.results.length === 0) {
    userElement.lib.watched.results.push(oneCardObj);

    btnAddDicabledWatched();
    addNowWatched();

    localStorage.setItem('users', JSON.stringify(localUsers));

    // notification['success']('You added a movie to Queue', 'Great');
  }

  const elemenOfArr = userElement.lib.watched.results.find(el => {
    if (el.id === oneCardObj.id) {
      console.log('в q есть такой');
      document.querySelector('.add_watched').removeAttribute('disabled');
      return el;
    }
  });

  //* вернет index эелемента
  const idx = userElement.lib.watched.results.indexOf(elemenOfArr);
  console.log(idx);

  console.log(userElement.lib.watched.results.length);
  //* удалит элемент
  userElement.lib.watched.results.splice(idx, 1);
  console.log(userElement.lib.watched.results.length);
}
