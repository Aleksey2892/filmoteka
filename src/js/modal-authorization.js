import refs from './refs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
// import { funTest } from './authorization';

const testBox = basicLightbox;

//  registration form
document.querySelector('.btn-reg').onclick = () => {
  testBox
    .create(
      `
      <form class="login-block">
      <h2 class="login-block__title">Registration</h2>
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
        <button class="login-block__registration btn-default">
          Registration
        </button>
      </div>
    </form>
  `,
      {
        onShow: testBox => {
          testBox
            .element()
            .querySelector('.login-block__registration').onclick =
            testBox.close;
        },
      },
    )
    .show();

  document.querySelector('.login-block').addEventListener('submit', funTest);
};

//  LOG IN form
document.querySelector('.btn-login').onclick = () => {
  testBox
    .create(
      `
      <form class="login-block">
      <h2 class="login-block__title">Log In</h2>
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
        <button class="login-block__log-in btn-default">
          Log In
        </button>
      </div>
    </form>
  `,
      // {
      //   onShow: testBox => {
      //     testBox
      //       .element()
      //       .querySelector('.login-block__registration').onclick =
      //       testBox.close;
      //   },
      // },
    )
    .show();

  // const btnLoginBlock = document.querySelector('.login-block__log-in');

  // btnLoginBlock.addEventListener('click', funTest);

  // document.querySelector('.login-block').addEventListener('submit', funTest);
};

let userId = 0;
let isOnline = false;

const users = [
  {
    userId: 0,
    userName: 'admin',
    userPass: 'admin',
  },
];

const localStorageData = JSON.parse(localStorage.getItem('users'));

try {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(users));
  }
} catch (error) {
  console.log(error);
}

function funTest(event) {
  event.preventDefault();

  const userName = document.querySelector('.login-block__user-name').value;
  const userPass = document.querySelector('.login-block__password').value;

  localStorageData.find(el => {
    if (el.userName === userName) {
      console.log('zaregan');
      return;
    } else {
      userId += 1;

      isOnline = true;

      const user = {
        userId: userId,
        userName: userName,
        userPass: userPass,
      };

      users.push(user);

      localStorage.setItem('users', JSON.stringify(users));

      addOnlineUser(userName);
    }
  });
}

// function funTest() {
//   event.preventDefault();

//   const userName = document.querySelector('.login-block__user-name');
//   const userPass = document.querySelector('.login-block__password');

//   document.querySelector('.login-block').removeEventListener('submit', funTest);

//   addDataUser(userName, userPass);

//   addOnlineUser();
// }

// const users = [
//   {
//     userId: 0,
//     userName: 'admin',
//     userPass: 'admin',
//   },
// ];

// localStorage.setItem('users', JSON.stringify(users));

// let userId = 0;
// let isOnline = false;

// function addDataUser(userName, userPass) {
//   // const arrUsersLocal = JSON.parse(localStorage.getItem('users'));
//   const arrUsersLocal = users;

//   let usName = document.querySelector('.username');
//   usName.textContent = userName.value;

//   userId += 1;

//   arrUsersLocal.find(el => {
//     if (el.userName === userName.value) {
//       console.log('есть уже');
//       return;
//     } else {
//       const user = {
//         userId: userId,
//         userName: userName.value,
//         userPass: userPass.value,
//         // isOnline: true,
//       };

//       isOnline = true;

//       users.push(user);

//       localStorage.setItem('users', JSON.stringify(users));
//     }
//   });
// }

function addOnlineUser(userName) {
  if (isOnline) {
    const btnAuthorisationLogin = document.querySelector('.wrapper-btn');
    const regBlock = document.querySelector('.authorization-block__data');
    const userNameOnPage = document.querySelector('.username');

    btnAuthorisationLogin.classList.remove('isonline-active');
    regBlock.classList.add('isonline-active');
    userNameOnPage.textContent = userName;
  }
}

// const btnAuthorisationlogout = document.querySelector('.btn-logout');

// btnAuthorisationlogout.addEventListener('click', logOut);

// function logOut() {
//   const arrUsersLocal = JSON.parse(localStorage.getItem('users'));

//   const updateIsOnline = arrUsersLocal.map(item => {
//     if (isOnline) {
//       const btnAuthorisationLogin = document.querySelector('.wrapper-btn');
//       const regBlock = document.querySelector('.authorization-block__data');

//       btnAuthorisationLogin.classList.add('isonline-active');
//       regBlock.classList.remove('isonline-active');

//       isOnline = false;
//     }
//   });

//   localStorage.setItem('users', JSON.stringify(updateIsOnline));
// }
