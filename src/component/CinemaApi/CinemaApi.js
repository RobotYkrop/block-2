export default class CinemaApi {
  _apiBase = 'https://api.themoviedb.org/3/';
  _apiKey = 'api_key=c64d9dbabab69b4b9bb367af0f97bee2';

  getApi = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error('Не найден API' + `${res.status}`);
    }
    return await res.json();
  };

  getPopularMovies = async (pageNumber = 1) => {
    return await this.getApi(`movie/popular?${this._apiKey}&language=en-US&page=${pageNumber}`);
  };

  getSearchMovie = async (query = 'return', pageNumber = 1) => {
    return await this.getApi(`search/movie?${this._apiKey}&include_adult=false&page=${pageNumber}&query=${query}`);
  };
}
