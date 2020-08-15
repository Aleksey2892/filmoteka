import refs from './refs';
import { searchFetch } from './searchFetch';
import startFetch from './startFetch';
import clearPage from './clearPage';
import { doNotVisible, doVisible } from './visibleFunc';
import renderCard from './renderManyCards';

let inputValue;

const api_key = 'cc24e28d216ef164940b9fd9893ff62a';

//  loading first page - popular films
startFetch().then(data => {
  renderCard(data);
});

// next page Btn listener
refs.nextPage.addEventListener('click', onNextBtn);

// load more button default (after loading page)
function onNextBtn() {
  if (inputValue) {
    onSearchNextBtn(inputValue);
  } else {
    startFetch().then(data => {
      renderCard(data);
    });
  }
}

// load more button after search
function onSearchNextBtn(inputValue) {
  searchFetch(inputValue).then(data => {
    renderCard(data);
  });
}

// on submit
refs.form.addEventListener('submit', event => {
  event.preventDefault();

  refs.activeMenu.classList.remove('active-menu');

  clearPage();

  // visible input value error
  if (event.currentTarget.elements.search.value === '') {
    doVisible();
  } else {
    doNotVisible();
    inputValue = event.currentTarget.elements.search.value;

    searchFetch(inputValue).then(data => {
      if (data.length === 0) {
        doVisible();
      } else {
        doNotVisible();
      }
      renderCard(data);
    });
  }
});
