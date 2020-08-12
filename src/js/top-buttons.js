const refs = {
	homeBg: document.querySelector('.section-top'),
	libBg: document.querySelector('.section-top-lib'),
	logoHome: document.querySelector('.logo-home'),
	home: document.querySelector('.home'),
	myLibrary: document.querySelector('.library-button'),
	myWatched: document.querySelector('.watched-button'),
	myQueue: document.querySelector('.queue-button'),
	searchBox: document.querySelector('.search-block'),
	error: document.querySelector('.error-search')
}

refs.myLibrary.addEventListener('click', (event) => {
	refs.searchBox.classList.add('visually-hidden');
	refs.myLibrary.classList.add('visually-hidden');
	refs.error.classList.remove('error-visible');
	refs.myWatched.classList.remove('visually-hidden');
	refs.myQueue.classList.remove('visually-hidden');
	refs.homeBg.classList.replace('section-top', 'section-top-lib')
})

refs.home.addEventListener('click', (event) => {
	refs.searchBox.classList.remove('visually-hidden');
	refs.myLibrary.classList.remove('visually-hidden');
	refs.error.classList.add('error-visible');
	refs.myWatched.classList.add('visually-hidden');
	refs.myQueue.classList.add('visually-hidden');
	refs.homeBg.classList.replace('section-top-lib', 'section-top')
})

refs.logoHome.addEventListener('click', (event) => {
	refs.searchBox.classList.remove('visually-hidden');
	refs.myLibrary.classList.remove('visually-hidden');
	refs.error.classList.add('error-visible');
	refs.myWatched.classList.add('visually-hidden');
	refs.myQueue.classList.add('visually-hidden');
	refs.homeBg.classList.replace('section-top-lib', 'section-top')
})