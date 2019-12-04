import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import TrailerVideo from './TrailerVideo';
import Reviews from './Reviews';
import SimilarMovies from './SimilarMovies';
import '../style/style.css';
import { TMDBApi } from './TMDBApi';
import { movieSpecificationsAction, setFavoritesAction, setWatchLaterAction } from '../actions/actions'


const imgBox = {
  width: '80%',
  maxHeight: '500px',
  overflow: 'hidden',
  borderRadius: '5px',
  boxShadow: '0px 0px 24px -4px rgba(0,0,0,0.36)',
  margin: '0% 10%'
};

const img = {
  width: '100%',
  display: 'block',
  position: 'relative',
  zIndex: '-1'
};

const classes = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1)
  }
}));

class MovieSpecifications extends React.Component {
  similarMoviesTitleRef = React.createRef();

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    setMovieSpecification: PropTypes.func.isRequired,
    genres: PropTypes.arrayOf(PropTypes.any),
    adult: PropTypes.bool,
    runtime: PropTypes.number,
    backdropPath: PropTypes.string,
    title: PropTypes.string,
    imdbID: PropTypes.string,
    releaseDate: PropTypes.number,
    movieSpecifications: PropTypes.shape({
      genres: PropTypes.arrayOf(PropTypes.any),
      adult: PropTypes.bool,
      runtime: PropTypes.number,
      backdropPath: PropTypes.string,
      title: PropTypes.string,
      imdbID: PropTypes.string,
      releaseDate: PropTypes.number,
    }),
    favorites: PropTypes.shape({
      entities: PropTypes.shape({
        favorites: PropTypes.shape({
          id: PropTypes.number,
          lang: PropTypes.string,
          overview: PropTypes.string,
          release: PropTypes.string,
          src: PropTypes.string,
          title: PropTypes.string,
          voteAvg: PropTypes.number,
        })
      })
    }).isRequired,
    watchLater: PropTypes.shape({
      entities: PropTypes.shape({
        watchLater: PropTypes.shape({
          id: PropTypes.number,
          lang: PropTypes.string,
          overview: PropTypes.string,
          release: PropTypes.string,
          src: PropTypes.string,
          title: PropTypes.string,
          voteAvg: PropTypes.number,
        })
      })
    }).isRequired,
    setFavorites: PropTypes.func,
    setWatchLater: PropTypes.func,
    sessionID: PropTypes.string.isRequired,
  };


  async componentDidMount() {
    const {
      setMovieSpecification,
      match: {
        params: { id: movieID }
      },
    } = this.props;

    const movieIDNum = Number(movieID);


    const { id, genres, adult, runtime, backdrop_path: backdropPath, title, imdbID, release_date: releaseDate } = await TMDBApi.getMovieDetails({ movieID: movieIDNum })
    setMovieSpecification({ id, genres, adult, runtime, backdropPath, title, movieID: movieIDNum, imdbID, releaseDate });
  }


  handleFavorites = async () => {
    const {
      match: {
        params: { id: movieID }
      },
      history,
      setFavorites,
      sessionID,
      favorites,
      movieSpecifications,
    } = this.props;

    const movieIDNum = Number(movieID);

    if (sessionID === '') {
      history.push('/login')
      return;
    }

    const { original_language: originalLanguage,
      overview,
      release_date: releaseDate,
      poster_path: posterPath,
      title,
      vote_average: voteAverage,
      vote_count: voteCount } = movieSpecifications[movieID]



    if (favorites.entities !== undefined && favorites.entities.favorites !== undefined) {

      if (favorites.entities.favorites[movieIDNum] !== undefined && favorites.entities.favorites[movieIDNum].id === movieIDNum) {

        delete favorites.entities.favorites[movieIDNum]
        const array = Object.values(favorites.entities.favorites)
        setFavorites(array)
        TMDBApi.addFavorite({ sessionID, movieID: movieIDNum, bool: false })
      }
      else {
        const newFav = {
          ...favorites.entities.favorites,
          [movieIDNum]: {
            id: movieIDNum, originalLanguage, overview, releaseDate, posterPath, title, voteAverage, voteCount
          }
        }
        const array = Object.values(newFav)
        setFavorites(array)
        TMDBApi.addFavorite({ sessionID, movieID: movieIDNum, bool: true })
      }
    }

    else {
      const newFav = {
        ...favorites.entities.favorites,
        [movieIDNum]: {
          id: movieIDNum, originalLanguage, overview, releaseDate, posterPath, title, voteAverage, voteCount
        }
      }
      const array = Object.values(newFav)
      setFavorites(array)
      TMDBApi.addFavorite({ sessionID, movieID: movieIDNum, bool: true })
    }
  }



  handleWatchLater = async () => {
    const {
      match: {
        params: { id: movieID }
      },
      history,
      setWatchLater,
      sessionID,
      watchLater,
      movieSpecifications
    } = this.props;

    const movieIDNum = Number(movieID);

    if (sessionID === '') {
      history.push('/login')
      return;
    }

    const { original_language: originalLanguage,
      overview,
      release_date: releaseDate,
      poster_path: posterPath,
      title,
      vote_average: voteAverage,
      vote_count: voteCount } = movieSpecifications[movieID]


    if (watchLater.entities !== undefined && watchLater.entities.watchLater !== undefined) {

      if (watchLater.entities.watchLater[movieIDNum] !== undefined && watchLater.entities.watchLater[movieIDNum].id === movieIDNum) {
        delete watchLater.entities.watchLater[movieIDNum]
        const array = Object.values(watchLater.entities.watchLater)
        setWatchLater(array)
        TMDBApi.addWatchLater({ sessionID, movieID: movieIDNum, bool: false })
      }
      else {
        const newFav = {
          ...watchLater.entities.watchLater,
          [movieIDNum]: {
            id: movieIDNum, originalLanguage, overview, releaseDate, posterPath, title, voteAverage, voteCount
          }
        }
        const array = Object.values(newFav)
        setWatchLater(array)
        TMDBApi.addWatchLater({ sessionID, movieID: movieIDNum, bool: true })
      }
    }

    else {
      const newFav = {
        ...watchLater.entities.watchLater,
        [movieIDNum]: {
          id: movieIDNum, originalLanguage, overview, releaseDate, posterPath, title, voteAverage, voteCount
        }
      }
      const array = Object.values(newFav)
      setWatchLater(array)
      TMDBApi.addWatchLater({ sessionID, movieID: movieIDNum, bool: true })
    }
  }




  render() {

    const {
      movieSpecifications,
      watchLater: {
        entities: { watchLater: watchLaterObj }
      },
      favorites: {
        entities: { favorites: favoritesObj }
      } } = this.props;

    if (movieSpecifications !== undefined) {

      const {
        match: {
          params: { id: movieID }
        }
      } = this.props;


      if (movieSpecifications[movieID] !== undefined) {

        const {
          genres,
          adult,
          runtime,
          backdropPath,
          title,
          imdbID,
          releaseDate } = movieSpecifications[movieID];

        const movieIDNum = Number(movieSpecifications[movieID].movieID);

        const genresList = genres.map(({ id, name }) => <div key={id}>{name}</div>);

        const runtimeHour = Math.floor(runtime / 60);
        const runtimeMin = runtime % 60;

        return (
          <Grid container spacing={3} className={classes.root}>
            <Grid item xs={12}>
              <div style={imgBox}>
                <img
                  src={`https://image.tmdb.org/t/p/original${backdropPath}`}
                  alt="backdrop"
                  style={img}
                />
              </div>
            </Grid>

            <Grid item xs={12}>
              <Typography>
                <Link
                  to="/"
                  href="/"
                  className={classes.link}
                  style={{ color: '#A65221', marginLeft: '10%' }}
                >
                  Back to list
                 </Link>
              </Typography>
              <h1 style={{ color: '#D99A4E', paddingBottom: '50px', margin: '0 25% 0 10%', fontSize: '52px', display: 'inline-block' }}>{title}</h1>
              <div className='starDiv' style={{ display: 'inline-block', marginRight: '50px' }}>
                {favoritesObj && favoritesObj[movieID] ?
                  <StarIcon fontSize='large' className='star' data-value={movieIDNum} onClick={this.handleFavorites} /> :
                  <StarBorderIcon fontSize='large' className='star' data-value={movieIDNum} onClick={this.handleFavorites} />
                }
                <span className="tooltiptextFav">Add to favourites</span>
              </div>

              <div className='watchLaterDiv' style={{ display: 'inline-block' }}>
                {watchLaterObj && watchLaterObj[movieID] ?
                  <PlaylistAddCheckIcon fontSize='large' className='watchLater' data-value={movieIDNum} onClick={this.handleWatchLater} /> :
                  <PlaylistAddIcon fontSize='large' className='watchLater' data-value={movieIDNum} onClick={this.handleWatchLater} />
                }
                <span className="tooltiptextwatchLater">Add to watch later</span>
              </div>
            </Grid>

            <Grid item xs={3} />

            <Grid
              item
              xs={2}
              style={{
                padding: '10px 20px 20px',
                lineHeight: '28px',
                backgroundColor: '#730202',
                color: 'wheat',
                textAlign: 'center',
                height: '250px',
                boxShadow: '0px 0px 24px -4px rgba(0,0,0,0.36)',
                borderRadius: '5px'
              }}
            >
              <h3 style={{ color: '#D99A4E' }}>Genres</h3>
              {genresList}
            </Grid>

            <Grid item xs={1} />

            <Grid
              item
              xs={3}
              style={{
                padding: '10px 20px 20px',
                lineHeight: '28px',
                backgroundColor: '#730202',
                color: 'wheat',
                textAlign: 'center',
                height: '250px',
                boxShadow: '0px 0px 24px -4px rgba(0,0,0,0.36)',
                borderRadius: '5px'
              }}
            >
              <h3 style={{ color: '#D99A4E' }}>More info</h3>

              <div>
                Runtime: {runtimeHour}h {runtimeMin}min
               </div>

              <div>Adult: {adult ? 'Yes' : 'No'}</div>
              <div>Realease date: {releaseDate}</div>

              <Link
                href={`https://www.imdb.com/title/${imdbID}`}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.link}
                style={{ color: 'wheat' }}
              >
                See more on IMDb
               </Link>
            </Grid>

            <Grid item xs={3} />


            <Grid item xs={12} style={{ padding: '100px 10%' }}>
              <TrailerVideo id={movieIDNum} />
            </Grid>


            <Grid item xs={12}>
              <div style={{ margin: '0px 200px' }}>
                <h1 style={{ padding: '0px 0px 0px 40px', color: '#D99A4E' }}>
                  Reviews
               </h1>
                <Reviews id={movieIDNum} />
              </div>
            </Grid>


            <h1
              style={{
                padding: '50px 0px 50px',
                textAlign: 'center',
                width: '100%',
                color: '#D99A4E'
              }}
              ref={this.similarMoviesTitleRef}
            >
              Similar Movies
               </h1>
            <div style={{ position: 'relative', textAlign: 'center' }}>


              {this.similarMoviesTitleRef ? <SimilarMovies id={movieIDNum} similarMoviesTitle={this.similarMoviesTitleRef} /> : ''}
            </div>

          </Grid>
        )
      }
    }
    return null;
  }
}

const mapState = (state) => ({
  watchLater: state.userInfo.watchLater,
  favorites: state.userInfo.favorites,
  movieSpecifications: state.movieList.movieSpecByID,
  sessionID: state.userInfo.sessionID,
})

const mapDispatchToProps = (dispatch) => {
  return {
    setMovieSpecification: ({ id, genres, adult, runtime, backdropPath, title, imdbID, movieID, releaseDate }) => dispatch(movieSpecificationsAction({ id, genres, adult, runtime, backdropPath, title, imdbID, movieID, releaseDate })),
    setFavorites: (detailsArr) => dispatch(setFavoritesAction(detailsArr)),
    setWatchLater: (detailsArr) => dispatch(setWatchLaterAction(detailsArr))
  }
}

export default connect(mapState, mapDispatchToProps)(withRouter(MovieSpecifications));
