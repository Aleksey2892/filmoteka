import axios from 'axios';
import refs from './refs';

const api_key = 'cc24e28d216ef164940b9fd9893ff62a';
export const pageNumber = {
  counter: 0,
};

export function searchFetch(inputValue) {
  pageNumber.counter += 1;
  return axios(
    `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${inputValue}&page=${pageNumber.counter}`,
  )
    .then(data => {
      ///////// for hidding button next
      if (pageNumber.counter === data.data.total_pages) {
        console.log('last page');
        document.getElementById('nextBtn').hidden = true;
      }
      ///////// for hidding button next

      return data.data.results;
    })
    .catch(error => {
      throw error;
    });
}
