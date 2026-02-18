const PIXABAY_API_KEY = '50796026-dd0290b59f51794dc2657bbd2';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (searchedQuery, page = 1, perPage = 24) => {
  const urlParams = new URLSearchParams({
    key: PIXABAY_API_KEY,
    q: searchedQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: perPage,
    page,
  });
  const response = await fetch(`${BASE_URL}?${urlParams.toString()}`);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response.json();
};
