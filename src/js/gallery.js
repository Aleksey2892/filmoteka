import refs from './refs';
import { searchFetch } from './searchFetch';
import startFetch from './startFetch';
import clearPage from './clearPage';
import renderCard from './renderManyCards';
import paginationLogic from './paginationLogic';
import { doNotVisible, doVisible } from './visibleFunc';

let inputValue;
let fetchType = 'start';
const api_key = 'cc24e28d216ef164940b9fd9893ff62a';

//  loading first page - popular films
startFetch().then(data => {
  fetchType = 'start';
  // timeout for spinner animation
  renderWithTimeout(data);
});

// on submit
refs.form.addEventListener('submit', event => {
  event.preventDefault();
  refs.activeMenu.classList.remove('active-menu');

  clearPage();

  // visible input value error
  if (event.currentTarget.elements.search.value === '') {
    doNotVisible(refs.errorWrong);
    doVisible(refs.errorNull);

    document.querySelector('#pagination').classList.add('not-visible');
  } else {
    doNotVisible(refs.errorNull);
    inputValue = event.currentTarget.elements.search.value;

    searchFetch(inputValue).then(data => {
      fetchType = 'search';

      if (data.results.length === 0) {
        document.querySelector('#pagination').classList.add('not-visible');

        doVisible(refs.errorWrong);
      } else {
        doNotVisible(refs.errorWrong);
        document.querySelector('#pagination').classList.add('not-visible');

        // timeout for spinner animation
        renderWithTimeout(data);
      }
    });
  }
});

function renderWithTimeout(data, currentPage) {
  // timeout for spinner animation
  refs.spinnerLoader.classList.remove('not-visible');

  setTimeout(() => {
    renderCard(data.results);
    paginationLogic(data.total_pages, currentPage);

    const paginatRef = document.querySelector('#pagination');

    paginatRef.classList.remove('not-visible');

    if (fetchType === 'search') {
      paginatRef.removeEventListener('click', handlePagination);
      paginatRef.addEventListener('click', handleSearchPagination);
    } else if (fetchType === 'start') {
      paginatRef.removeEventListener('click', handleSearchPagination);
      paginatRef.addEventListener('click', handlePagination);
    }

    refs.spinnerLoader.classList.add('not-visible');
  }, 1000);
}

function handlePagination(event) {
  const currentPageNum = Number(
    event.currentTarget.querySelector('.current').textContent,
  );

  if (event.target.textContent !== '') {
    const targetNum = event.target.textContent;

    startFetch(targetNum).then(data => {
      clearPage();
      renderWithTimeout(data, Number(targetNum));
    });
  } else if (event.target.classList.contains('arrow-left')) {
    startFetch(changeNumPage('minus', currentPageNum)).then(data => {
      clearPage();
      renderWithTimeout(data, currentPageNum);
    });
  } else if (event.target.classList.contains('arrow-right')) {
    startFetch(changeNumPage('plus', currentPageNum)).then(data => {
      clearPage();
      renderWithTimeout(data, currentPageNum);
    });
  }
}

function handleSearchPagination(event) {
  const currentPageNum = Number(
    event.currentTarget.querySelector('.current').textContent,
  );

  if (event.target.textContent !== '') {
    const targetNum = event.target.textContent;

    searchFetch(inputValue, targetNum).then(data => {
      clearPage();
      renderWithTimeout(data, Number(targetNum));
    });
  } else if (event.target.classList.contains('arrow-left')) {
    searchFetch(inputValue, changeNumPage('minus', currentPageNum)).then(
      data => {
        fetchType = 'search';
        clearPage();
        renderWithTimeout(data, currentPageNum);
      },
    );
  } else if (event.target.classList.contains('arrow-right')) {
    searchFetch(inputValue, changeNumPage('plus', currentPageNum)).then(
      data => {
        fetchType = 'search';
        clearPage();
        renderWithTimeout(data, currentPageNum);
      },
    );
  }
}

function changeNumPage(sign, num) {
  if (num === 1) {
    return;
  } else if (sign === 'minus') {
    return num;
  } else if (sign === 'plus') {
    return num;
  }
}
