import refs from './refs';
import cardFetch from './oneCardFetch';
import onefilmCard from '../templates/onefilmCard.hbs';
import clearPage from './clearPage';

refs.listFilms.addEventListener('click', event => {
    //   console.log(event.currentTarget); //ul
    // console.dir(event.target); //img, h3, ..

    if (event.target.nodeName === 'IMG' || event.target.nodeName === 'H3') {
        // console.log(event.target.dataset.id);
        cardFetch(event.target.dataset.id).then(obj => {
            clearPage();
            refs.listFilms.insertAdjacentHTML('beforeend', onefilmCard(obj));
        });
    }
});