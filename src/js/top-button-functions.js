import refs from "./refs-buttons.js"


const openMyLibrary = () => {
	refs.searchBox.classList.add('visually-hidden');
	refs.error.classList.remove('error-visible');
	refs.myWatched.classList.remove('visually-hidden');
	refs.myQueue.classList.remove('visually-hidden');
	refs.myWatched.classList.add('active');
	refs.homeBg.classList.replace('section-top', 'section-top-lib')
};

const closeMyLibrary = () => {
	refs.searchBox.classList.remove('visually-hidden');
	refs.error.classList.add('error-visible');
	refs.myWatched.classList.add('visually-hidden');
	refs.myQueue.classList.add('visually-hidden');
	refs.homeBg.classList.replace('section-top-lib', 'section-top')
	refs.myWatched.classList.remove('active');
	refs.myQueue.classList.remove('active');
};

const openWatched = () => {
	refs.myWatched.classList.add('active');
	refs.myQueue.classList.remove('active');
};

const openQueue = () => {
	refs.myWatched.classList.remove('active');
	refs.myQueue.classList.add('active');
};

export default { openMyLibrary, closeMyLibrary, openWatched, openQueue }
