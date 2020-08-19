import notification from 'toastr';
import { oneCardObj, getLocal } from './renderSingleCard';
// ==================
// watched
// ==================
export function addToWatched(whoOnline, localUsers) {
  if (event.target.classList.contains('add_watched')) {
    const userElement = localUsers.find(el => {
      if (el.userName === whoOnline) {
        return el;
      }
    });

    if (userElement.lib.watched.length === 0) {
      userElement.lib.watched.push(oneCardObj);

      localStorage.setItem('users', JSON.stringify(localUsers));

      notification['success']('You added a movie to Watched', 'Great');
    } else {
      const isFilm = userElement.lib.watched.find(el => {
        if (el.id === oneCardObj.id) {
          console.log('есть такой');
          notification['info']('This movie is on your list Watched', 'Info');
          return true;
        }
      });

      if (!isFilm) {
        userElement.lib.watched.push(oneCardObj);

        localStorage.setItem('users', JSON.stringify(localUsers));

        notification['success']('Great', 'You added a movie to Watched');
      }
    }
  }
}

// ==================
// queue
// ==================
export function addToQueue(whoOnline, localUsers) {
  if (event.target.classList.contains('add_queue')) {
    console.log('ты под логином. нажал на кнопку добавить');

    const userElement = localUsers.find(el => {
      if (el.userName === whoOnline) {
        return el;
      }
    });

    if (userElement.lib.queue.length === 0) {
      userElement.lib.queue.push(oneCardObj);

      localStorage.setItem('users', JSON.stringify(localUsers));

      notification['success']('You added a movie to Queue', 'Great');
    } else {
      const isFilm = userElement.lib.queue.find(el => {
        if (el.id === oneCardObj.id) {
          console.log('есть такой');
          notification['info']('This movie is on your list Queue', 'Info');
          return true;
        }
      });

      if (!isFilm) {
        userElement.lib.queue.push(oneCardObj);

        localStorage.setItem('users', JSON.stringify(localUsers));

        notification['success']('Great', 'You added a movie to Queue');
      }
    }
  }
}
