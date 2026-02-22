import './css/styles.css';
import './css/loader.css';
import arrowLeft from './img/arrow.svg';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import getImagesByQuery from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const btnLoading = document.querySelector('.btn-loading');
const gallery = document.querySelector('.gallery');

let page = 1;
let value = '';
let totalHits = 0;
const PER_PAGE = 15;

form.addEventListener('submit', async event => {
  event.preventDefault();

  clearGallery();
  hideLoadMoreButton();
  page = 1;

  const query = event.target.elements['search-text'].value.trim();
  value = query;

  if (!query) {
    iziToast.show({
      class: 'custom-error-toast',
      message: 'Enter the search word',
      position: 'topRight',
      timeout: 5000,
    });
    return;
  }

  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    if (!data.hits || data.hits.length === 0) {
      iziToast.show({
        class: 'custom-error-toast',
        message:
          'Sorry, there are no images matching your search query. Please, try again!',
        position: 'topRight',
        timeout: 5000,
        iconUrl: arrowLeft,
        iconColor: '#ffffff',
      });
      return;
    }

    totalHits = data.totalHits;
    createGallery(data.hits);
    page += 1;

    if ((page - 1) * PER_PAGE < totalHits) {
      showLoadMoreButton();
    } else {
      iziToast.show({
        class: 'custom-error-toast',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        timeout: 5000,
      });
    }
  } catch (error) {
    console.log(error);
    iziToast.show({
      class: 'custom-error-toast',
      message: 'Something went wrong while fetching data',
      position: 'topRight',
      timeout: 5000,
    });
  } finally {
    hideLoader();
  }
});

btnLoading.addEventListener('click', async () => {
  hideLoadMoreButton(); // 🔥 обов'язково ховаємо кнопку перед запитом
  showLoader();

  try {
    const data = await getImagesByQuery(value, page);

    if (data.hits && data.hits.length > 0) {
      createGallery(data.hits);

      const firstCard = gallery.querySelector('.gallery-container');
      if (firstCard) {
        const { height: cardHeight } = firstCard.getBoundingClientRect();
        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }

      page += 1;

      if ((page - 1) * PER_PAGE < totalHits) {
        showLoadMoreButton();
      } else {
        iziToast.show({
          class: 'custom-error-toast',
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
          timeout: 5000,
        });
      }
    } else {
      iziToast.show({
        class: 'custom-error-toast',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        timeout: 5000,
      });
    }
  } catch (error) {
    console.log(error);
    iziToast.show({
      class: 'custom-error-toast',
      message: 'Something went wrong while fetching data',
      position: 'topRight',
      timeout: 5000,
    });
  } finally {
    hideLoader();
  }
});
