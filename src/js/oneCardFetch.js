const { default: refs } = require('./refs');

import axios from 'axios';
const api_key = 'cc24e28d216ef164940b9fd9893ff62a';
// const baseUrl = `https://api.themoviedb.org/3/movie`;



export default function cardFetch(id) {
  return axios(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`)
    .then(data => {
      console.log(data.data);
      return data.data;
    })
    .catch(error => {
      throw error;
    });
}

