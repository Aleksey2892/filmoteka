export default function addOnlineUser() {
  const localStorageData = JSON.parse(localStorage.getItem('users'));
  const btnAuthorisationLogin = document.querySelector('.wrapper-btn');
  const regBlock = document.querySelector('.authorization-block__data');
  const userNameOnPage = document.querySelector('.username');

  localStorageData.find(elem => {
    if (elem.isOnline) {
      btnAuthorisationLogin.classList.remove('isonline-active');
      regBlock.classList.add('isonline-active');
      userNameOnPage.textContent = `${elem.userName}`;
    }
  });
}
