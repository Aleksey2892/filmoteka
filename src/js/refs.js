const refs = {
  activeMenu: document.querySelector('.active-menu'),
  logOutBtn: document.querySelector('.btn-logout'),
  form: document.querySelector('.search-block'),
  listFilms: document.querySelector('.films-list'),
  nextPage: document.querySelector('.start-next-page'),
  errorWrong: document.querySelector('.search-wrong'),
  errorNull: document.querySelector('.search-null'),
  spinnerLoader: document.querySelector('.cssload-dots'),

  pagination: document.querySelector('#pagination'),
  //for library
  libraryBtn: document.querySelector('.library-button'),
  btnsContainer: document.querySelector('.btn-container'),
  watchedBtn: document.querySelector('.watched-button'),
  // queueBtn: document.querySelector('.queue-button'),
  // addForLibrary: document.querySelector('.buttons__block'),
  // addQueueBtn: document.querySelector('add_queue'),
};

export default refs;
