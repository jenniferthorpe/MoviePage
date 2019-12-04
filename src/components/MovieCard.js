/* eslint-disable camelcase */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import '../style/firstPage.css';
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { TMDBApi } from './TMDBApi';
import { MyDb } from './MyDb'
import { setFavoritesAction, setWatchLaterAction } from '../actions/actions';


class MovieCard extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    setFavorites: PropTypes.func,
    setWatchLater: PropTypes.func,
    sessionID: PropTypes.string.isRequired,
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
    id: PropTypes.number,
    lang: PropTypes.string,
    overview: PropTypes.string,
    release: PropTypes.string,
    src: PropTypes.string,
    title: PropTypes.string,
    voteAvg: PropTypes.number,
    voteNum: PropTypes.number,
  };

  static defaultProps = {
    title: 'Unknown',
    release: 'Unknown',
  }

  handleFavorites = async (e) => {
    const {
      history,
      setFavorites,
      sessionID,
      favorites: { entities: { favorites } },
      id,
      lang: original_language,
      overview,
      release: release_date,
      src: poster_path,
      title,
      voteAvg: vote_average,
      voteNum: vote_count
    } = this.props;

    const movieID = Number(e.currentTarget.dataset.value);

    if (sessionID === '') {
      history.push('/login')
      return;
    }

    if (favorites !== undefined) {

      if (favorites[movieID] === undefined) {
        const newFav = {
          ...favorites,
          [movieID]: {
            id, original_language, overview, release_date, poster_path, title, vote_average, vote_count
          }
        }
        const array = Object.values(newFav)
        setFavorites(array)
        TMDBApi.addFavorite({ sessionID, movieID, bool: true })
        MyDb.addFavorite({ poster_path, title, release_date, original_language, vote_count, vote_average, overview, movieID, sessionID })
      }

      else if (favorites[movieID].id === movieID) {
        delete favorites[movieID]
        const array = Object.values(favorites)

        setFavorites(array)
        TMDBApi.addFavorite({ sessionID, movieID, bool: false })
        MyDb.removeFavorite({ movieID, sessionID })
      }
    }

    else {
      const newFav = {
        [movieID]: {
          id, original_language, overview, release_date, poster_path, title, vote_average, vote_count
        }
      }
      const array2 = Object.values(newFav)
      setFavorites(array2)
      TMDBApi.addFavorite({ sessionID, movieID, bool: true })
    }

  }

  handleWatchLater = async (e) => {
    const { history, setWatchLater, sessionID, watchLater: { entities: { watchLater } }, id, lang: original_language, overview, release: release_date, src: poster_path, title, voteAvg: vote_average, voteNum: vote_count } = this.props;
    const movieID = Number(e.currentTarget.dataset.value);

    if (sessionID === '') {
      history.push('/login')
      return;
    }

    if (watchLater !== undefined) {

      if (watchLater[movieID] === undefined) {
        const newFav = {
          ...watchLater,
          [movieID]: {
            id, original_language, overview, release_date, poster_path, title, vote_average, vote_count
          }
        }
        const array = Object.values(newFav)
        setWatchLater(array)
        TMDBApi.addWatchLater({ sessionID, movieID, bool: true })
      }
      else if (watchLater[movieID].id === movieID) {
        delete watchLater[movieID]
        const array = Object.values(watchLater)

        setWatchLater(array)
        TMDBApi.addWatchLater({ sessionID, movieID, bool: false })
      }
    }
    else {
      const newWatchLater = {
        [movieID]: {
          id, original_language, overview, release_date, poster_path, title, vote_average, vote_count
        }
      }
      const array2 = Object.values(newWatchLater)
      setWatchLater(array2)
      TMDBApi.addWatchLater({ sessionID, movieID, bool: true })
    }

  }

  render() {

    const {
      id: movieID,
      lang,
      overview,
      release,
      src,
      title,
      voteAvg,
      watchLater: { entities: { watchLater } },
      favorites: { entities: { favorites } },
    } = this.props;

    let langFullText = lang;


    switch (lang) {
      case 'en':
        langFullText = 'english';
        break;
      case 'fr':
        langFullText = 'french';
        break;
      case 'sp':
        langFullText = 'spanish';
        break;
      default:
        langFullText = lang;
        break;
    }

    return (
      <div className='container'>

        <Link to={{ pathname: `/movies/${movieID}` }} className='gridImage'>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w200${src}`}
              alt="movie"
            />
          </div>
        </Link>

        <Link to={{ pathname: `/movies/${movieID}` }} style={{ textDecoration: 'none' }} className='title'>
          <h1 style={{ color: '#D99A4E', fontSize: '1.6em' }}>{title}</h1>
        </Link>

        <div className='releaseInfo'>
          Release Date: {release}
        </div>

        <div className='rating'>
          Avarage rating: <span style={{ fontSize: '32px' }}>{voteAvg}</span>{' '}
        </div>

        <div className='overview'>
          {overview}
        </div>

        <div className='language'>
          Language: {langFullText}
        </div>

        <div className='starDiv'>
          {favorites && favorites[movieID] ?
            <StarIcon fontSize='large' className='star' data-value={movieID} onClick={this.handleFavorites} /> :
            <StarBorderIcon fontSize='large' className='star' data-value={movieID} onClick={this.handleFavorites} />
          }
          <span className="tooltiptextFav">Add to favourites</span>
        </div>

        <div className='watchLaterDiv'>
          {watchLater && watchLater[movieID] ?
            <PlaylistAddCheckIcon fontSize='large' className='watchLater' data-value={movieID} onClick={this.handleWatchLater} /> :
            <PlaylistAddIcon fontSize='large' className='watchLater' data-value={movieID} onClick={this.handleWatchLater} />
          }
          <span className="tooltiptextwatchLater">Add to watch later</span>
        </div>

      </div >
    )
  }
}

const mapState = (state) => ({
  favorites: state.userInfo.favorites,
  watchLater: state.userInfo.watchLater,
  sessionID: state.userInfo.sessionID,

})

const mapDispatch = (dispatch) => ({
  setFavorites: (detailsArr) => dispatch(setFavoritesAction(detailsArr)),
  setWatchLater: (detailsArr) => dispatch(setWatchLaterAction(detailsArr))
})


export default connect(mapState, mapDispatch)(withRouter(MovieCard));
