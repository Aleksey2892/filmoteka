import { oneCardObj, getLocal } from './renderSingleCard';

export default function btnAddDicabled() {
  const whoOnline = localStorage.getItem('isOnline');
  const allUsers = getLocal('users');

  const elUser = allUsers.find(el => {
    console.log(whoOnline);
    console.log(el.userName);

    if (el.userName === whoOnline) {
      console.log(el);
      return el;
    }
  });

  const btnW = document.querySelector('.add_watched');

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
