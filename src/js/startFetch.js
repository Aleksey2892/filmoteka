import axios from 'axios';
// import { pageNumber } from './searchFetch';
import refs from './refs';
import whatsOnPage from './whatsOnPage';

export const api_key = 'cc24e28d216ef164940b9fd9893ff62a';

export function startFetch(pageNumber = 1) {
  refs.spinnerLoader.classList.remove('not-visible');

  return axios(
    `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}&page=${pageNumber}`,
  )
    .then(data => {
      refs.spinnerLoader.classList.add('not-visible');

      whatsOnPage.data = data.data;
      console.log('data startFetch: ', whatsOnPage.data);

      return data.data;
    })
    .catch(error => {
      throw error;
    });
}
