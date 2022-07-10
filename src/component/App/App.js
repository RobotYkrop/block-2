import { format, parseISO } from 'date-fns';
import React from 'react';
import { Spin, Alert, Pagination, Empty } from 'antd';
import { Offline, Online } from 'react-detect-offline';

import './App.css';
import 'antd/dist/antd.min.css';
import CinemaApi from '../CinemaApi/CinemaApi';
import CinemaList from '../CinemaList/CinemaList';
import Search from '../Search/Search';

export default class App extends React.Component {
  getApi = new CinemaApi();
  state = {
    movie: [],
    isLoading: true,
    isError: false,
    notFound: false,
    searchQuery: '',
    numberPage: 1,
    totalPages: 0,
  };

  componentDidMount() {
    this.getMovies();
  }

  getMovies = () => {
    const { numberPage } = this.state;
    this.setState({
      movies: [],
      isLoading: true,
      notFound: false,
      isError: false,
    });
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
        this.searchMovies();
      }
    );
  };

  createMovie = (item) => {
    return {
      id: item.id,
      poster: `https://image.tmdb.org/t/p/original${item.poster_path}`,
      title: item.title || 'Not title',
      releaseDate: item.release_date ? format(parseISO(item.release_date), 'MMMM dd, yyyy') : 'no release date',
      overview: item.overview || 'Not movie',
    };
  };

  addMovieToList = (item) => {
    const newItem = this.createMovie(item);

    this.setState(({ movie }) => {
      const newData = [...movie, newItem];
      return {
        movie: newData,
      };
    });
  };

  render() {
    // fetch('https://api.themoviedb.org/3/movie/popular?api_key=c64d9dbabab69b4b9bb367af0f97bee2&language=en-US&page=1')
    //   .then((res) => res.json())
    //   .then((res) => console.log(res));
    const { movie, isLoading, isError, numberPage, totalPages, notFound } = this.state;

    const errMessage = isError ? <Alert message="Alert message title" description="Problems...." type="info" /> : null;

    const loading = isLoading && !isError ? <Spin tip="Loading..." /> : null;

    const content = !(isLoading || isError) ? (
      <CinemaList movie={movie} isLoading={isLoading} isError={isError} />
    ) : null;

    const foundMovies = notFound ? <Empty /> : <CinemaList movie={movie} isLoading={isLoading} isError={isError} />;

    const pagination =
      totalPages > 0 && !isLoading ? (
        <Pagination defaultCurrent={1} current={numberPage} total={totalPages} onChange={this.changePage} />
      ) : null;

    if (Online) {
      return (
        <div className="container">
          <Search searchChange={this.searchChange} />
          <section className="ant-layout">
            {errMessage}
            {loading}
            {foundMovies}
            {content}
            {pagination}
          </section>
        </div>
      );
    } else {
      <Offline>Проверьте соединение с интернетом</Offline>;
    }
  }
}
