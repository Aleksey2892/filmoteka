import refs from './refs';

function doVisible(item) {
  item.classList.add('error-visible');
  refs.nextPage.classList.add('visually-hidden');
}

function doNotVisible(item) {
  item.classList.remove('error-visible');
  refs.nextPage.classList.remove('visually-hidden');
}

export { doNotVisible, doVisible };

// errorNull;
