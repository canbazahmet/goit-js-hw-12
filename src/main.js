import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { fetchImages } from './js/pixabay-api';
import { createGalleryCard } from './js/render-functions';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.loader');
const loadMoreBtnEl = document.querySelector('.js-load-more');

const PER_PAGE = 24;
let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

const lightbox = new SimpleLightbox('.js-gallery a');

const toggleLoader = isVisible => {
  loaderEl.classList.toggle('is-hidden', !isVisible);
};

const toggleLoadMore = isVisible => {
  loadMoreBtnEl.classList.toggle('is-hidden', !isVisible);
};

const scrollAfterAppend = () => {
  const firstCard = galleryEl.firstElementChild;
  if (!firstCard) {
    return;
  }
  const { height } = firstCard.getBoundingClientRect();
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
};

const updateLoadMoreVisibility = loadedCount => {
  const isExhausted = loadedCount >= totalHits;
  const showLoadMore = !isExhausted && loadedCount >= PER_PAGE;
  toggleLoadMore(showLoadMore);
};

const renderImages = images => {
  const galleryMarkup = images
    .map(imgDetails => createGalleryCard(imgDetails))
    .join('');
  if (currentPage === 1) {
    galleryEl.innerHTML = galleryMarkup;
  } else {
    galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);
  }
  lightbox.refresh();
};

const loadImages = async () => {
  toggleLoader(true);
  try {
    const data = await fetchImages(currentQuery, currentPage, PER_PAGE);
    toggleLoader(false);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      toggleLoadMore(false);
      return;
    }

    totalHits = data.totalHits;
    renderImages(data.hits);

    const loadedCount = galleryEl.children.length;
    if (data.hits.length < PER_PAGE || loadedCount >= totalHits) {
      toggleLoadMore(false);
    } else {
      toggleLoadMore(true);
    }
  } catch (error) {
    toggleLoader(false);
    iziToast.error({
      message: `${error}`,
      position: 'topRight',
    });
  }
};

const onSearchFormSubmit = async event => {
  event.preventDefault();
  const searchedValue = searchFormEl.elements.user_query.value.trim();
  if (searchedValue === '') {
    return;
  }

  currentQuery = searchedValue;
  currentPage = 1;
  totalHits = 0;
  galleryEl.innerHTML = '';
  toggleLoadMore(false);

  await loadImages();
  searchFormEl.reset();
};

const onLoadMoreClick = async () => {
  currentPage += 1;
  await loadImages();

  const loadedCount = galleryEl.children.length;
  updateLoadMoreVisibility(loadedCount);
  scrollAfterAppend();
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreClick);
