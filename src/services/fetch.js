import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39344710-74bbb124ce1c1439ca3e67f9f';

const fetchImages = async (query, page) => {
  const response = await axios.get(
    `${BASE_URL}?q=${query}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
  );
  return response.data.hits;
};
export default fetchImages;
