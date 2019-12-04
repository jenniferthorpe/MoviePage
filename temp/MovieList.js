import React from 'react';
import MovieCard from './MovieCard';

class MovieList extends React.Component {
  constructor() {
    super();
    this.state = {
      movieList: []
    };
  }

  async componentDidMount() {
    const { results: movieList } = await fetch(
      'https://api.themoviedb.org/3/trending/movie/week?api_key=d2530355598301431a821ae172ea0b6f'
    ).then(response => response.json());

    this.setState({
      movieList
    });
    console.log(movieList);
  }

  render() {
    const { movieList } = this.state;

    if (movieList.length > 0) {

      return movieList.map(
        (
          {
            poster_path: posterPath,
            title,
            release_date: releaseDate,
            original_language: originalLanguage,
            adult,
            vote_count: voteCount,
            vote_average: voteAvarage,
            overview,
            id
          }
        ) => {
          return (
            <MovieCard
              src={posterPath}
              title={title}
              release={releaseDate}
              lang={originalLanguage}
              adult={adult}
              voteNum={voteCount}
              voteAvg={voteAvarage}
              overview={overview}
              id={id}
              key={id}
            />
          );
        }
      );
    }
    // window.jen=this
    // console.log("rendered");
    return null;
  }
}

export default MovieList;
