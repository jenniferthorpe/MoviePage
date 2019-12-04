/* eslint-disable no-case-declarations */
/* eslint-disable import/prefer-default-export */
import { normalize, schema } from 'normalizr';
import { MOVIELIST, MOVIE_SPECIFICATIONS } from '../actions/actions'


const initialState = {
  movieList: [],
  movieListNormalized: undefined,
  page: 1,
  counter: 0,
  movieSpecByID: undefined,
}

const movieEntity = new schema.Entity('movies');
const mySchema = { movies: [movieEntity] };

export const movieListReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case MOVIELIST:
      const movieList = [...state.movieList, ...payload.movies]

      const myData = { movies: movieList };
      const normalizedData = normalize(myData, mySchema);



      if (state.counter === 0) {
        return {
          ...state,
          movieList,
          movieListNormalized: normalizedData,
          page: payload.page + 1,
          counter: +1,
        }
      }

      return {
        ...state,
        counter: +1,
        movieList,
        movieListNormalized: normalizedData,
        page: payload.page + 1,
      }

    case MOVIE_SPECIFICATIONS:
      return {
        ...state,
        movieSpecByID: {
          ...state.movieSpecByID,
          [payload.id]: payload.details
        }
      }




    default:
      return state;


  }
}




