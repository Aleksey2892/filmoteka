import refs from './refs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
// import { funTest } from './authorization';

document.querySelector('.btn-login').onclick = () => {
  basicLightbox
    .create(
      `
      <form class="login-block">
      <h2 class="login-block__title">Authorization</h2>
      <input
        class="login-block__user-name"
        type="text"
        placeholder="Enter your name..."
        required
      />
      <input
        class="login-block__password"
        type="password"
        placeholder="Enter your password..."
        required
      />
      <div class="login-block__btn-block">
        <button class="login-block__log-in btn-default">Log in</button>
        <button class="login-block__registration btn-default">
          Registration
        </button>
      </div>
    </form>
  `,
    )
    .show();

  const form = document
    .querySelector('.login-block')
    .addEventListener('submit', funTest);
};

function funTest() {
  event.preventDefault();

  const userName = document.querySelector('.login-block__user-name');
  const userPass = document.querySelector('.login-block__password');
  const btnLogin = document.querySelector('.login-block__log-in');
  const btnReg = document.querySelector('.login-block__registration');

  btnReg.addEventListener('click', addDataUser(userName, userPass));

  addOnlineUser();

  // btnLogin.removeEventListener('click', funTest22);
}

const users = [];
let userId = 0;

function addDataUser(userName, userPass) {
  userId += 1;

  const user = {
    userId: userId,
    userName: userName.value,
    userPass: userPass.value,
    isOnline: false,
  };

  users.push(user);

  localStorage.setItem('users', JSON.stringify(users));

  // console.log(user);
  // console.log(users);
}

function addOnlineUser() {
  const arrUsersLocal = JSON.parse(localStorage.getItem('users'));

  console.log(arrUsersLocal);

  arrUsersLocal.find(item => {
    if (item.isOnline) {
      const btnAuthorisationLogin = document.querySelector('.btn-login');
      const regBlock = document.querySelector('.authorization-block__data');
      btnAuthorisationLogin.classList.remove('isonline-active');
      regBlock.classList.add('isonline-active');
    }
    console.log('-za if-');

    basicLightbox.close();
  });

  // const btnAuthorisationLogin = document.querySelector('.btn-login');
  // const regBlock = document.querySelector('.authorization-block__data');
  // btnAuthorisationLogin.classList.remove('isonline-active');
  // regBlock.classList.add('isonline-active');
}

const btnAuthorisationlogout = document.querySelector('.btn-logout');

btnAuthorisationlogout.addEventListener('click', logOut);

function logOut() {}
