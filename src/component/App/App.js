// import { format, parseISO } from 'date-fns';
import React from 'react';

import './App.css';
import CinemaApi from '../CinemaApi/CinemaApi';
import CinemaList from '../CinemaList/CinemaList';

export default class App extends React.Component {
  getApi = new CinemaApi();
  constructor() {
    super();
    this.state = {
      movie: [],
    };
  }
  componentDidMount() {
    this.getApi.getMovie().then((results) => this.setState({ movie: results.results }));
  }

  // createItem = (item) => {
  //   const releaseDate = item.release_date ? format(parseISO(item.release_date), 'MMMM dd, yyyy') : 'no release date';
  //   const filmTitle = item.title || 'Movie title not specified';
  //   const overview = item.overview || 'Movie overview not specified';
  //   const popularity = item.vote_average || 0;
  //   let posterURL = `https://image.tmdb.org/t/p/w200${item.poster_path}`;

  //   return {
  //     id: item.id,
  //     filmTitle,
  //     posterURL,
  //     releaseDate,
  //     overview,
  //     popularity,
  //   };
  // };

  // addItemToList = (item) => {
  //   const newItem = this.createItem(item);

  //   this.setState(({ movies }) => {
  //     const newDataStream = [...movies, newItem];
  //     return {
  //       movie: newDataStream,
  //     };
  //   });
  // };

  render() {
    const { movie } = this.state;
    return (
      <section className="movie">
        <CinemaList movie={movie} />
      </section>
    );
  }
}
