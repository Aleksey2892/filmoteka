import getLocal from './getLocal';

export default function allLocalData() {
  console.log({
    whoOnline: localStorage.getItem('isOnline'),
    localUsers: getLocal('users'),
  });
  return {
    whoOnline: localStorage.getItem('isOnline'),
    localUsers: getLocal('users'),
  };
}
