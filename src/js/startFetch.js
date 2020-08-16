import axios from 'axios';
import { pageNumber } from './searchFetch';
import refs from './refs';

const api_key = 'cc24e28d216ef164940b9fd9893ff62a';

export default function startFetch() {
  pageNumber.counter += 1;

  refs.spinnerLoader.classList.remove('not-visible');

  return axios(
    `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}&page=${pageNumber.counter}`,
  )
    .then(data => {
      refs.spinnerLoader.classList.add('not-visible');

      return data.data;
    })
    .catch(error => {
      throw error;
    });
}
