import refs from './refs';
import startFetch from './startFetch';
import gallerySearch from './gallerySearch';
import fetchSettings from './fetchSettings';
import renderWithTimeout from './renderWithTimeout';

//  loading first page - popular films
startFetch().then(data => {
  fetchSettings.totalPages = data.total_pages;
  fetchSettings.fetchType = 'start';

  // timeout for spinner animation
  renderWithTimeout(data);
});

// on submit
refs.form.addEventListener('submit', gallerySearch);
