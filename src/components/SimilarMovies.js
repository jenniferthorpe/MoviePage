import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShowMoreText from 'react-show-more-text';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ReactPaginate from 'react-paginate';
import '../style/style.css'
import placeholder from '../images/placeholder.svg'
import { TMDBApi } from './TMDBApi';


const classes = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  }
}));

class SimilarMovies extends Component {
  posterPathRef = React.createRef();

  static propTypes = {
    id: PropTypes.number.isRequired,
    similarMoviesTitle: PropTypes.shape({
      current: PropTypes.any
    }).isRequired
  };

  state = {
    similarMovies: [],
    page: 1,
    pageArray: []
  }

  componentDidMount() {
    this.getMovieData();
  }


  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    if (page !== prevState.page) {
      this.getMovieData();
    }

  }


  async getMovieData() {
    const { id: movieID } = this.props;
    const { page } = this.state;

    const completeResponse = await TMDBApi.getSimilar({ movieID, page })

    const pageArray = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= completeResponse.total_pages; i++) {
      pageArray.push(i);
    }

    const { results: similarMovies } = completeResponse;

    this.setState({
      similarMovies,
      pageArray
    });
  }

  pagination = (onPage) => {
    const { selected } = onPage;

    const { similarMoviesTitle } = this.props;
    similarMoviesTitle.current.scrollIntoView();
    this.setState({ page: selected + 1 })
  }


  render() {
    const { similarMovies, pageArray } = this.state;
    if (similarMovies.length > 0) {

      const similarMapped = similarMovies.map(
        ({ title, poster_path: posterPath, overview, id: movieID }) => (
          <div
            key={movieID}
            style={{
              width: '450px',
              height: '300px',
              display: 'flex',
              margin: '25px 10px',
              flexShrink: 0
            }
            }
          >
            <div
              style={{
                width: '200px',
                height: '300px',
              }}
            >
              <img
                src={posterPath ? `https://image.tmdb.org/t/p/w200/${posterPath}` : placeholder} // ???
                alt="movie poster"
                style={{
                  display: 'inline-block',
                  width: '200px'
                }}
                ref={this.posterPathRef}
              />
            </div>
            <div
              style={{
                display: 'inline-block',
                width: '50%',
                padding: '10px',
                textAlign: 'left'
              }}
            >
              <h3 style={{ color: '#D99A4E' }}>{title}</h3>
              <ShowMoreText
                lines={5}
                more=""
                less="Show less"
                anchorClass=""
                onClick={this.executeOnClick}
                expanded={false}
              >
                {overview}
              </ShowMoreText>
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                style={{ marginTop: '10px' }}
                href={`/movies/${movieID}`}
              >
                See more
                </Button>
            </div>
          </div >
        )
      )

      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }} >
          {similarMapped}
          < ReactPaginate pageCount={pageArray.length} pageRangeDisplayed={5} marginPagesDisplayed={1} onPageChange={this.pagination} containerClassName="paginationStyle" activeClassName='activePage' />
        </div >
      )

    };


    return null;
  }
}

export default SimilarMovies;
