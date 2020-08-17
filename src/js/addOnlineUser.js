export default function addOnlineUser(userName) {
  const btnAuthorisationLogin = document.querySelector('.wrapper-btn');
  const regBlock = document.querySelector('.authorization-block__data');
  const userNameOnPage = document.querySelector('.username');

  btnAuthorisationLogin.classList.remove('isonline-active');
  regBlock.classList.add('isonline-active');
  userNameOnPage.textContent = userName;
}
