const KEY = '6444317-c61155bd44e68957af67120b1';
const BASE_URL = 'https://pixabay.com/api/';

function getImages(query, page = 1) {
  return fetch(
    `${BASE_URL}?key=${KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(new Error(`No results for ${query}`));
    })
    .then(response =>
      response.hits.map(({ id, tags, webformatURL, largeImageURL }) => {
        return { id, tags, webformatURL, largeImageURL };
      })
    );
}
const api = { getImages };

export default api;
