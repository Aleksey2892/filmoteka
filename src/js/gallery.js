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
  renderCard(data.results);
});

// next page Btn listener
refs.nextPage.addEventListener('click', onNextBtn);

// load more button default (after loading page)
function onNextBtn() {
  if (inputValue) {
    onSearchNextBtn(inputValue);
  } else {
    startFetch().then(data => {
      renderCard(data.results);
    });
  }
}

// load more button after search
function onSearchNextBtn(inputValue) {
  searchFetch(inputValue).then(data => {
    if (data.page === data.total_pages) {
      document.querySelector('#next-btn').hidden = true;
    } else {
      document.querySelector('#next-btn').hidden = false;
    }

    renderCard(data.results);
  });
}

// on submit
refs.form.addEventListener('submit', event => {
  event.preventDefault();

  refs.activeMenu.classList.remove('active-menu');

  clearPage();

  // visible input value error
  if (event.currentTarget.elements.search.value === '') {
    doNotVisible(refs.errorWrong);
    doVisible(refs.errorNull);
  } else {
    doNotVisible(refs.errorNull);
    inputValue = event.currentTarget.elements.search.value;

    searchFetch(inputValue).then(data => {
      // console.log(data);
      if (data.page === data.total_pages) {
        document.querySelector('#next-btn').hidden = true;
      } else if (data.results.length === 0) {
        refs.errorWrong.classList.add('error-visible');
        doVisible(refs.errorWrong);
      } else {
        document.querySelector('#next-btn').hidden = false;
        doNotVisible(refs.errorWrong);
      }
      renderCard(data.results);
    });
  }
});
