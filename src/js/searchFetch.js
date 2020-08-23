import axios from 'axios';
import { genres } from './getGenres';
import { api_key } from './startFetch';
axios.defaults.baseURL = `https://api.themoviedb.org/3`;

export const searchFetch = async (inputValue, pageNumber = 1) => {
  try {
    const cards = axios
      .get(
        `/search/movie?api_key=${api_key}&query=${inputValue}&page=${pageNumber}`,
      )
      .then(data => {
        return data.data.results;
      });

    const cardsData = await Promise.all([cards, genres]);
    if (!cardsData) throw 'ups.ERROR';

    return cardsData;
  } catch (error) {
    throw error;
  }
};
