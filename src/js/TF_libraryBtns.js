import dataFromLocal from './dataFromLocal';
import refs from './refs';
import clearPage from './clearPage';
import renderLibraryCardList from './TF_renderCardForLibrary';

let savedListFilms = {
  watched: [],
  queue: [],
};
if (dataFromLocal()) {
  savedListFilms.watched = dataFromLocal();
  console.log(savedListFilms.watched);
}
///listener for library btns
refs.btnsContainer.addEventListener('click', ev => {
  clearPage();
  console.dir(ev.target.innerText);
  if (ev.innerText === 'WATCHED') {
    console.log('onClick watched');
  }
  if (ev.innerText === 'QUEUE') {
    console.log('onClick queue');
  }
  renderLibraryCardList(savedListFilms.watched);
  ///// //getting data with changes for template
  // console.log(savedListFilms.watched);///////////////////
});

export default function pushLocalArr(item, arrName) {
  console.log(arrName);
  //   if (arrName === 'watched') {
  //если массив пустой:
  if (savedListFilms.watched.length < 1) {
    console.log('add first');
    return savedListFilms.watched.push(item);
  } else {
    //пройтись по массиву искать совпадения. !!!!!
    const findItem = savedListFilms.watched.find(el => el === item);
    if (findItem) {
      console.log('Selected'); //добавить в кнопку

      //если нет совпадений, то добавить в массив
    } else {
      console.log('add more');
      return savedListFilms.watched.push(item);
    }
    localStorage.setItem(
      'savedListFilms',
      JSON.stringify(savedListFilms.watched),
    );
  }

  //   } else {
  // if (savedListFilms.queue.length < 1) {
  //   console.log('add first');
  //   return savedListFilms.queue.push(item);
  // } else {
  //   //пройтись по массиву искать совпадения. !!!!!
  //   const findItem = savedListFilms.queue.find(el => el === item);
  //   if (findItem) {
  //     console.log('Selected'); //добавить в кнопку

  //     //если нет совпадений, то добавить в массив
  //   } else {
  //     console.log('add more');
  //     return savedListFilms.queue.push(item);
  //   }
  // }
}
