function doVisible() {
  refs.errorNull.classList.add('error-visible');
  refs.nextPage.classList.add('visually-hidden');
}

function doNotVisible() {
  refs.errorNull.classList.remove('error-visible');
  refs.nextPage.classList.remove('visually-hidden');
}

export { doNotVisible, doVisible };
