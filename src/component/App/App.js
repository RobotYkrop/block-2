import { format, parseISO } from 'date-fns';
import React from 'react';
import { Spin, Alert, Pagination, Empty, Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { Offline, Online } from 'react-detect-offline';
import store from 'store';

import './App.css';
import 'antd/dist/antd.min.css';
import CinemaApi from '../CinemaApi/CinemaApi';
import CinemaList from '../CinemaList/CinemaList';
import Search from '../Search/Search';
import HeaderTabs from '../HeaderTabs/Tabs';
import { Provider } from '../CinemaContext/CinemaContext';

export default class App extends React.PureComponent {
  getApi = new CinemaApi();
  state = {
    movie: [],
    genresList: [],
    ratedFilm: [],
    isLoading: true,
    isError: false,
    notFound: false,
    searchQuery: '',
    guestSession: '',
    numberPage: 1,
    totalPages: 0,
    tab: '1',
  };

  componentDidMount() {
    if (store.get('guestSession')) {
      this.setState({
        guestSession: store.get('guestSession'),
      });
    } else {
      this.getGuestSession();
    }
    this.getMovies();
  }

  getMovies = () => {
    const { numberPage } = this.state;
    this.setState({
      movies: [],
      notFound: false,
      isError: false,
    });
    this.getGenresList();
    this.getApi
      .getPopularMovies(numberPage)
      .then((item) => {
        this.setState({
          isLoading: false,
          totalPages: item.total_pages,
          numberPage,
        });
        if (item.results.length === 0) {
          this.setState({
            isLoading: false,
            notFound: true,
          });
        }
        item.results.forEach((elm) => {
          this.addMovieToList(elm);
        });
      })
      .catch(this.onError);
  };

  onError = () => {
    this.setState(() => {
      return {
        isError: true,
        isLoading: false,
        notFound: false,
      };
    });
  };

  // Получение гостевой сессии
  getGuestSession = () => {
    this.getApi
      .guestSession()
      .then((body) => {
        store.set('guestSession', `${body.guest_session_id}`);
        this.setState({
          guestSession: body.guest_session_id,
          isLoading: false,
        });
      })
      .catch(this.onError);
  };

  // Поисковая строка
  searchMovies = () => {
    const { searchQuery, numberPage } = this.state;
    this.setState({
      movie: [],
      isLoading: true,
      notFound: false,
      isError: false,
    });
    if (searchQuery === '') {
      this.getMovies();
    } else {
      this.getApi
        .getSearchMovie(searchQuery, numberPage)
        .then((item) => {
          this.setState({
            isLoading: false,
            totalPages: item.total_pages,
            numberPage,
          });
          if (item.results.length === 0) {
            this.setState({
              isLoading: false,
              notFound: true,
            });
          }
          item.results.forEach((elm) => {
            this.addMovieToList(elm);
          });
        })
        .catch(this.onError);
    }
  };

  searchChange = (searchQuery) => {
    this.setState(
      {
        searchQuery,
        numberPage: 1,
      },
      () => {
        this.searchMovies();
      }
    );
  };

  changePage = (page) => {
    this.setState(
      {
        numberPage: page,
      },
      () => {
        if (this.state.tab === '1') {
          this.searchMovies();
        } else {
          this.getRated();
        }
      }
    );
  };

  changeTab = (key) => {
    if (key === '2') {
      this.setState(
        {
          isLoading: false,
          notFound: false,
          tab: key,
          numberPage: 1,
        },
        () => {
          this.getRated();
        }
      );
    } else {
      this.setState({
        isLoading: false,
        notFound: false,
        tab: key,
        numberPage: this.searchMovies(),
      });
    }
  };

  addMovieToList = (item) => {
    const newItem = this.createMovie(item);
    this.setState(({ movie }) => {
      const newData = [...movie, newItem];
      return {
        movie: newData,
        isLoading: false,
      };
    });
  };

  getGenresList = () => {
    this.getApi
      .getIdTagsList()
      .then((body) => {
        this.setState({
          genresList: [...body.genres],
        });
      })
      .catch(this.onError);
  };

  mapGenresList = (Ids) => {
    let arr = [];
    this.state.genresList.forEach((el) => {
      for (let Id of Ids) {
        if (el.id === Id) {
          arr.push(el.name);
        }
      }
    });
    return arr;
  };

  addRatedItemToList = (item) => {
    const newItem = this.createMovie(item);

    this.setState(({ ratedFilm }) => {
      const newData = [...ratedFilm, newItem];
      return {
        ratedFilm: newData,
        isLoading: false,
      };
    });
  };

  getRated = () => {
    const { guestSession, numberPage } = this.state;
    this.setState({
      ratedFilm: [],
      isLoading: true,
      notFound: false,
      isError: false,
    });
    this.getApi
      .getRated(guestSession, numberPage)
      .then((item) => {
        this.setState({
          totalPages: item.total_pages,
          numberPage,
        });
        if (item.results.length === 0) {
          this.setState({
            isLoading: false,
            notFound: true,
          });
        }
        item.results.forEach((elm) => {
          this.addRatedItemToList(elm);
        });
      })
      .catch(this.onError);
  };

  createMovie = (item) => {
    return {
      id: item.id,
      poster: `https://image.tmdb.org/t/p/original${item.poster_path}`,
      title: item.title || 'Not title',
      releaseDate: item.release_date ? format(parseISO(item.release_date), 'MMMM dd, yyyy') : 'Not date',
      overview: item.overview || 'Not overview',
      genres: this.mapGenresList(item.genre_ids),
      rating: store.get(`${item.id}`) || item.rating || 'Not rating',
      popularity: item.vote_average || 0,
    };
  };

  render() {
    const { movie, isLoading, isError, numberPage, totalPages, notFound, guestSession, tab, ratedFilm } = this.state;

    const CinContext = { movie, ratedFilm, tab, guestSession, isError, isLoading };

    const errMessage = isError ? <Alert message="Alert! Alert! Alert!" description="Problems...." type="info" /> : null;

    const loading = isLoading && !isError ? <Spin tip="Loading..." /> : null;

    const search = tab === '1' ? <Search searchChange={this.searchChange} /> : null;

    const foundMovies = notFound ? <Empty /> : <CinemaList />;

    const pagination =
      totalPages > 0 && !isLoading ? (
        <Pagination defaultCurrent={1} current={numberPage} total={totalPages} onChange={this.changePage} />
      ) : null;

    if (Online) {
      return (
        <Provider value={CinContext}>
          <div className="container">
            <HeaderTabs changeTab={this.changeTab} />
            <Layout>
              {search}
              <Content className="ant-layout">
                {errMessage}
                {loading}
                {foundMovies}
                {pagination}
              </Content>
            </Layout>
          </div>
        </Provider>
      );
    } else {
      <Offline>Проверьте соединение с интернетом</Offline>;
    }
  }
}
