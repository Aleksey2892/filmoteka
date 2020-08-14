import axios from 'axios';
import refs from './refs';
import tempCard from '../templates/tempCard.hbs';
import genre_names from './genre_ids';

let inputValue;
const api_key = 'cc24e28d216ef164940b9fd9893ff62a';
// v4//const api_key ='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzI0ZTI4ZDIxNmVmMTY0OTQwYjlmZDk4OTNmZjYyYSIsInN1YiI6IjVmMzJiZTJhMTk2NzU3MDAzN2IyOTdiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eklE7KpArGZEjZ8EtPWfnHm4uf6Hy8QdLtxbIFbzwro';
const baseURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}`;

refs.form.addEventListener('submit', event => {
  event.preventDefault();
  inputValue = event.currentTarget.elements.search.value;
  //   event.target.firstElementChild.value;

  clearPage();
  searchFetch(inputValue).then(data => {
    renderCard(data);
  });
});

//for start
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

//for search
function searchFetch(inputValue) {
  return axios(
    `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${inputValue}`,
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

    //for genre

    elem.genre_ids = getGenreNames(elem.genre_ids).join(', ');

    return elem;
  });
  console.log(arr2);
  refs.listFilms.insertAdjacentHTML('beforeend', tempCard(arr2));
}

function clearPage() {
  refs.listFilms.innerHTML = '';
}

//  first page (popular films)
startFetch().then(data => {
  renderCard(data);
});

//genre

// // for genres
function getGenreNames(arrIds) {
  const findId = arrIds.map(id => {
    return genre_names.find(el => {
      if (el.id === id) {
        console.log(el.name);
        return el.name;
      }
    });
  });
  const getName = findId.map(elem => {
    return elem.name;
  });
  console.log(getName);
  return getName;
}

//  export default startFetch;
