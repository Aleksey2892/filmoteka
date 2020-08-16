import axios from 'axios';
import refs from './refs';

const api_key = 'cc24e28d216ef164940b9fd9893ff62a';
const pageNumber = 1;
// export const pageNumber = {
//   counter: 1,
// };

export function searchFetch(inputValue) {


  return axios(
    `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${inputValue}&page=${pageNumber}`,
  )
    .then(data => {
      // console.log(data.data.total_pages);
      return data.data;
    })
    .catch(error => {
      throw error;
    });
}
