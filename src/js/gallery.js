import refs from './refs';
import tempCard from '../templates/tempCard.hbs';
import getGenreNames from './getGenres';
import searchFetch from './searchFetch';
import startFetch from './startFetch';

let inputValue;
const api_key = 'cc24e28d216ef164940b9fd9893ff62a';
// v4//const api_key ='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzI0ZTI4ZDIxNmVmMTY0OTQwYjlmZDk4OTNmZjYyYSIsInN1YiI6IjVmMzJiZTJhMTk2NzU3MDAzN2IyOTdiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eklE7KpArGZEjZ8EtPWfnHm4uf6Hy8QdLtxbIFbzwro';
// const baseURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}`;

const pageNumber = {
  counter: 0,
};

refs.form.addEventListener('submit', event => {
  event.preventDefault();
  inputValue = event.currentTarget.elements.search.value;
  //   event.target.firstElementChild.value;
  clearPage();
  searchFetch(inputValue).then(data => {
    renderCard(data);
  });

  //   next page for search
  refs.nextPage.addEventListener('click', onSearchNextBtn);
  function onSearchNextBtn() {
    searchFetch(inputValue).then(data => {
      renderCard(data);
    });
  }
});

//next page for start
refs.nextPage.addEventListener('click', onStNextBtn);

function onStNextBtn() {
  startFetch().then(data => {
    renderCard(data);
  });
}

function renderCard(arr) {
  const arr2 = arr.map(elem => {
    elem.release_date = elem.release_date.substr(0, 4);

    elem.genre_ids = getGenreNames(elem.genre_ids).join(', ');

    return elem;
  });

  refs.listFilms.insertAdjacentHTML('beforeend', tempCard(arr2));
}

function clearPage() {
  refs.listFilms.innerHTML = '';
  pageNumber.counter = 0;
  refs.nextPage.removeEventListener('click', onStNextBtn);
}

//  first page (popular films)
startFetch().then(data => {
  renderCard(data);
});

//  export default startFetch;
