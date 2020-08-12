import axios from 'axios';
import refs from './refs';
import tempCard from '../templates/tempCard.hbs';

let search;
const api_key = 'cc24e28d216ef164940b9fd9893ff62a';
// const api_key =
//   'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzI0ZTI4ZDIxNmVmMTY0OTQwYjlmZDk4OTNmZjYyYSIsInN1YiI6IjVmMzJiZTJhMTk2NzU3MDAzN2IyOTdiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eklE7KpArGZEjZ8EtPWfnHm4uf6Hy8QdLtxbIFbzwro';
const baseURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}`;
// const baseURL = `https://api.themoviedb.org/4/list/1?api_key=${api_key}`;

refs.form.addEventListener('submit', event => {
  event.preventDefault();

  search = event.target.firstElementChild.value;
  clearPage();
  searchFetch(search).then(data => {
    console.log(data, 'мы на 20й строчке');
    renderCard(data);
  });
});

//start
function startFetch() {
  return axios(baseURL)
    .then(data => {
      //   this.pageNumber += 1;

      return data.data.results;
    })
    .catch(error => {
      throw error;
    });
}

//search
function searchFetch(search) {
  return axios(
    `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${search}`,
  )
    .then(data => {
      //   this.pageNumber += 1;

      return data.data.results;
    })
    .catch(error => {
      throw error;
    });
}

function renderCard(arr) {
  console.log(arr);
  const arr2 = arr.map(elem => {
    elem.release_date = elem.release_date.substr(0, 4);
    return elem;
  });
  console.log(arr2);
  refs.listFilms.insertAdjacentHTML('beforeend', tempCard(arr2));
}

function clearPage() {
  refs.listFilms.innerHTML = '';
}

startFetch().then(data => {
  console.log(data, 'мы на 20й строчке');
  renderCard(data);
});

// export default startFetch;
