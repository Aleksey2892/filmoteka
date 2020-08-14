import refs from './refs';
import tempCard from '../templates/tempCard.hbs';
import getGenreNames from './getGenres';
import searchFetch from './searchFetch';
import startFetch from './startFetch';

const api_key = 'cc24e28d216ef164940b9fd9893ff62a';

export const pageNumber = {
  counter: 0,
};

// starting (first page - popular films)
startFetch().then(data => {
  renderCard(data);

  //next page for start
  refs.nextPage.addEventListener('click', onStNextBtn);
});

let inputValue = '';

refs.form.addEventListener('submit', event => {
  event.preventDefault();

  pageNumber.counter = 1;

  //   next page for search
  refs.nextPage.addEventListener('click', onSearchNextBtn);

  if (inputValue !== event.currentTarget.elements.search.value) {
    inputValue = event.currentTarget.elements.search.value;
    searchFetch(inputValue).then(data => {
      clearPage();
      renderCard(data);
      console.log('if !== input');

      return;
    });
  }

  function onSearchNextBtn() {
    searchFetch(inputValue).then(data => {
      renderCard(data);
      console.log('search next btn', pageNumber.counter);
    });
  }
});

function onStNextBtn() {
  startFetch().then(data => {
    renderCard(data);
    console.log('start btn');
  });
}

function renderCard(filmsList) {
  const customList = filmsList.map(elem => {
    // elem.release_date = elem.release_date.substr(0, 4);

    elem.genre_ids = getGenreNames(elem.genre_ids).join(', ');

    return elem;
  });

  refs.listFilms.insertAdjacentHTML('beforeend', tempCard(customList));
}

function clearPage() {
  refs.listFilms.innerHTML = '';
  pageNumber.counter = 1;

  refs.nextPage.removeEventListener('click', onStNextBtn);
}

//  export default startFetch;
