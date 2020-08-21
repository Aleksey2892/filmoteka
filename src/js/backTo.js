import refs from './refs';
import whatsOnPage from './whatsOnPage';
import renderWithTimeout from './renderWithTimeout';
import clearPage from './clearPage';

export default function backTo() {
  console.log('test start');

  refs.backBtn.classList.add('not-visible');

  clearPage();

  console.log(whatsOnPage.data);

  renderWithTimeout(whatsOnPage.data);
}
