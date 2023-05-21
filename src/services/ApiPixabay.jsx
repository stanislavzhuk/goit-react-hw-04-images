import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34785717-8063b5203a171717f86304ea0';

async function fetchImages(searchQuery, page) {
    const response = await axios.get(BASE_URL, {
      params: {
        q: searchQuery,
        page: page,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      }
    });

    return response.data;
}

export default fetchImages;