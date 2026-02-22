import axios from 'axios';

const apiKey = '53488466-2fe47a70cbfd22011f3ae89f6';

export default async function getImagesByQuery(query, page = 1) {
  const searchParams = new URLSearchParams({
    key: apiKey,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15,
  });

  const response = await axios.get(`https://pixabay.com/api/?${searchParams}`);

  return response.data;
}
