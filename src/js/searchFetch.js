import axios from 'axios';
import { pageNumber } from './gallery';

const api_key = 'cc24e28d216ef164940b9fd9893ff62a';

// const pageNumber = {
//   counter: 1,
// };

export default function searchFetch(inputValue) {
  return axios(
    `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${inputValue}&page=${pageNumber.counter}`,
  )
    .then(data => {
      pageNumber.counter += 1;
      return data.data.results;
    })
    .catch(error => {
      throw error;
    });
}
