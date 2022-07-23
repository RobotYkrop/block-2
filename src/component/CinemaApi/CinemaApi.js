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

  getPopularMovies = async (pageNumber) => {
    return await this.getApi(`movie/popular?${this._apiKey}&include_adult=false&language=en-US&page=${pageNumber}`);
  };

  getSearchMovie = async (query = 'return', pageNumber) => {
    return await this.getApi(`search/movie?${this._apiKey}&include_adult=false&page=${pageNumber}&query=${query}`);
  };

  getRated = async (guestSessionToken, pageNumber) => {
    return await this.getApi(`guest_session/${guestSessionToken}/rated/movies?${this._apiKey}&page=${pageNumber}`);
  };

  guestSession = async () => {
    return await this.getApi(`authentication/guest_session/new?${this._apiKey}`);
  };

  setRating = async (id, guestSessionToken, rate) => {
    const url = `${this._apiBase}movie/${id}/rating?${this._apiKey}&guest_session_id=${guestSessionToken}`;
    const body = {
      value: rate,
    };
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(body),
    }).catch((err) => {
      console.error('Возникла проблема с fetch запросом: ', err.message);
    });
  };

  deleteRate = async (id, guestSessionToken) => {
    const url = `${this._apiBase}movie/${id}/rating?${this._apiKey}&guest_session_id=${guestSessionToken}`;
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
    await fetch(url, {
      method: 'DELETE',
      headers,
    });
  };

  getIdTagsList = async () => {
    return await this.getApi(`genre/movie/list?${this._apiKey}`);
  };
}
