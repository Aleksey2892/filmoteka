export function addDisabledBtnWatched() {
  const btnW = document.querySelector('.add_watched');

  btnW.classList.add('active');
  btnW.setAttribute('disabled', true);
  btnW.textContent = 'Added in Watched';
}

export function addDisabledBtnQueue() {
  const btnW = document.querySelector('.add_queue');

  btnW.classList.add('active');
  btnW.setAttribute('disabled', true);
  btnW.textContent = 'Added in Queue';
}
