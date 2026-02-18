const PIXABAY_API_KEY = '50796026-dd0290b59f51794dc2657bbd2';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = searchedQuery => {
  const urlParams = new URLSearchParams({
    key: PIXABAY_API_KEY,
    q: searchedQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 24,
  });
  return fetch(`${BASE_URL}?${urlParams.toString()}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
