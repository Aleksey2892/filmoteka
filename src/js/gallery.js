import refs from './refs';
import tempCard from '../templates/tempCard.hbs';
import getGenreNames from './getGenres';
import { searchFetch } from './searchFetch';
import startFetch from './startFetch';
import clearPage from './clearPage';

let inputValue;

const api_key = 'cc24e28d216ef164940b9fd9893ff62a';
// v4//const api_key ='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzI0ZTI4ZDIxNmVmMTY0OTQwYjlmZDk4OTNmZjYyYSIsInN1YiI6IjVmMzJiZTJhMTk2NzU3MDAzN2IyOTdiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eklE7KpArGZEjZ8EtPWfnHm4uf6Hy8QdLtxbIFbzwro';
// const baseURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}`;

//  loading first page - popular films
startFetch().then(data => {
  renderCard(data);
});

//next page Btn listener
refs.nextPage.addEventListener('click', onNextBtn);
function onNextBtn() {
  if (inputValue) {
    onSearchNextBtn(inputValue);
  } else {
    startFetch().then(data => {
      renderCard(data);
    });
  }
}

function onSearchNextBtn(inputValue) {
  searchFetch(inputValue).then(data => {
    renderCard(data);
  });
}

// on submit
refs.form.addEventListener('submit', event => {
  event.preventDefault();
  clearPage();
  console.log(event);
  if (event.currentTarget.elements.search.value === '') {
    console.log('Please enter search word');
    refs.errorNull.classList.add('error-visible');
    refs.nextPage.classList.add('visually-hidden');
  } else {
    refs.errorNull.classList.remove('error-visible');
    refs.nextPage.classList.remove('visually-hidden');
    inputValue = event.currentTarget.elements.search.value;

    searchFetch(inputValue).then(data => {
      if (data.length === 0) {
        refs.errorWrong.classList.add('error-visible');
        refs.nextPage.classList.add('visually-hidden');
        console.log('wrong!!!');
      } else {
        refs.errorWrong.classList.remove('error-visible');
        refs.nextPage.classList.remove('visually-hidden');
      }
      renderCard(data);
      if (elem.poster_path === '') {
        elem.poster_path = '';
      }
    });
  }
});

function renderCard(arr) {
  const arr2 = arr.map(elem => {
    elem.release_date = elem.release_date.substr(0, 4);
    elem.genre_ids = getGenreNames(elem.genre_ids).join(', ');
    console.log(elem.poster_path);
    if (elem.poster_path === null) {
      elem.poster_path = 'https://cutt.ly/bd8IOZ4';
    } else {
      elem.poster_path = `https://image.tmdb.org/t/p/w500/${elem.poster_path}`;
    }
    return elem;
  });

  refs.listFilms.insertAdjacentHTML('beforeend', tempCard(arr2));
}

//  export default startFetch;
