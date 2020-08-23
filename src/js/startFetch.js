import axios from 'axios';
import { genres } from './getGenres';

export const api_key = 'cc24e28d216ef164940b9fd9893ff62a';
axios.defaults.baseURL = `https://api.themoviedb.org/3`;
export const startFetch = async (pageNumber = 1) => {
  try {
    const cards = axios
      .get(
        `/discover/movie?sort_by=popularity.desc&api_key=${api_key}&page=${pageNumber}`,
      )
      .then(data => data.data.results);

    const cardsData = await Promise.all([cards, genres]);
    if (!cardsData) throw 'ups.ERROR';
    return cardsData;
  } catch (error) {
    throw error;
  }
};
