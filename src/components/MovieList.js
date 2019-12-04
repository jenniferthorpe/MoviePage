import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MovieCard from './MovieCard';
import { movieListAction } from '../actions/actions';
import { TMDBApi } from './TMDBApi'



class MovieList extends React.Component {
  static propTypes = {
    appRef: PropTypes.shape({
      current: PropTypes.any
    }).isRequired,
    page: PropTypes.number.isRequired,
    setMovieList: PropTypes.func.isRequired,
    movieList: PropTypes.arrayOf(PropTypes.shape({
      poster_path: PropTypes.string,
      title: PropTypes.string,
      release_date: PropTypes.string,
      original_language: PropTypes.string,
      overview: PropTypes.string,
      adult: PropTypes.bool,
      id: PropTypes.number,
      vote_average: PropTypes.number,
      vote_count: PropTypes.number,

    })).isRequired
  }


  componentDidMount() {

    const { movieList } = this.props;
    if (movieList.length < 20) {
      this.fetchMovies();
    }
    window.addEventListener('scroll', this.loadMoreMovies);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.loadMoreMovies)
  }


  loadMoreMovies = () => {
    const { appRef } = this.props;

    const scrollHeightMin = appRef.current.scrollHeight - 1806;
    const scrollHeight = appRef.current.scrollHeight - 1306;

    if (window.scrollY > scrollHeightMin && window.scrollY < scrollHeight) {
      this.fetchMovies()
    }
  }


  async fetchMovies() {
    const { page, setMovieList } = this.props;

    const { results: movies } = await TMDBApi.getTrending({ timeWindow: 'week', page });
    setMovieList({ movies, page });
  }


  render() {
    const { movieList } = this.props;

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
            vote_average: voteAverage,
            overview,
            id
          }, i
        ) => {
          return (
            <MovieCard
              src={posterPath}
              title={title}
              release={releaseDate}
              lang={originalLanguage}
              adult={adult}
              voteNum={voteCount}
              voteAvg={voteAverage}
              overview={overview}
              id={id}
              key={id}
              index={i}
            />
          );
        }
      );
    }

    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    movieList: state.movieList.movieList,
    page: state.movieList.page
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMovieList: ({ movies, page }) => dispatch(movieListAction({ movies, page })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
