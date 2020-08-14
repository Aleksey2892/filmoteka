import axios from 'axios';
import { pageNumber } from './searchFetch';

const api_key = 'cc24e28d216ef164940b9fd9893ff62a';

export default function startFetch() {
  pageNumber.counter += 1;
  return axios(
    `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}&page=${pageNumber.counter}`,
  )
    .then(data => {
      return data.data.results;
    })
    .catch(error => {
      throw error;
    });
}
