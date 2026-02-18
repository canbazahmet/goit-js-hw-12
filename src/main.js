import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { fetchImages } from './js/pixabay-api';
import { createGalleryCard } from './js/render-functions';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.loader');

let lightbox = new SimpleLightbox('.js-gallery a');

const toggleLoader = () => {
  loaderEl.classList.toggle('is-hidden');
};

const onSearchFormSubmit = event => {
  event.preventDefault();
  const searchedValue = searchFormEl.elements.user_query.value.trim();
  if (searchedValue === '') {
    return;
  }

  galleryEl.innerHTML = '';

  toggleLoader();

  fetchImages(searchedValue)
    .then(data => {
      toggleLoader();

      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }

      const galleryMarkup = data.hits
        .map(imgDetails => createGalleryCard(imgDetails))
        .join('');

      galleryEl.innerHTML = galleryMarkup;

      lightbox.refresh();
      searchFormEl.reset();
    })
    .catch(error => {
      toggleLoader();
      console.log(error);
      iziToast.error({
        message: `${error}`,
        position: 'topRight',
      });
    });
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
