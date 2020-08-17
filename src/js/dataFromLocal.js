export default function dataFromLocal() {
  try {
    const localArr = localStorage.getItem('savedListFilms');
    const arr = JSON.parse(localArr);

    return arr;
  } catch (error) {
    console.log(error);
  }
}
