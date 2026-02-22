import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const btnLoading = document.querySelector('.btn-loading');

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
       <li class="gallery-container">
        <a href="${largeImageURL}">
          <img class="gallery-img" src="${webformatURL}" alt="${tags}" />
        </a>
        <ul class="gallery-list">
          <li class="gallery-item">
            <p class="gallery-name">Likes</p>
            <p class="gallery-value">${likes}</p>
          </li>
          <li class="gallery-item">
            <p class="gallery-name">Views</p>
            <p class="gallery-value">${views}</p>
          </li>
          <li class="gallery-item">
            <p class="gallery-name">Comments</p>
            <p class="gallery-value">${comments}</p>
          </li>
          <li class="gallery-item">
            <p class="gallery-name">Downloads</p>
            <p class="gallery-value">${downloads}</p>
          </li>
        </ul>
      </li>
        `;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  if (loader) loader.classList.remove('hidden');
}

export function hideLoader() {
  if (loader) loader.classList.add('hidden');
}

export const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

export function showLoadMoreButton() {
  btnLoading.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  btnLoading.classList.add('hidden');
}
