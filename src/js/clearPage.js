import refs from './refs';
// import { pageNumber } from './searchFetch';

export default function clearPage() {
  refs.listFilms.textContent = '';
  // pageNumber.counter = 0;
}
