/* eslint-disable import/prefer-default-export */
const APP_PREFIX = 'APP';
export const MOVIELIST = `${APP_PREFIX}/MOVIELIST`;
export const SESSIONID = `${APP_PREFIX}/SESSIONID`;
export const USERINFO = `${APP_PREFIX}/USERINFO`;
export const MOVIE_DETAILS = `${APP_PREFIX}/MOVIE_DETAILS`;
export const FAVORITES = `${APP_PREFIX}/FAVORITES`;
export const MOVIE_SPECIFICATIONS = `${APP_PREFIX}/MOVIE_SPECIFICATIONS`;
export const WATCH_LATER = `${APP_PREFIX}/WATCH_LATER`;

export const movieListAction = ({ movies, page }) => ({
    type: MOVIELIST,
    payload: {
        movies,
        page,
    }
})

export const sessionIDAction = (userSessionID) => ({
    type: SESSIONID,
    payload: userSessionID
})


export const userInfoAction = ({ username }) => ({
    type: USERINFO,
    payload: {
        username,
    }
})

export const movieDetailsAction = ({ id, posterPath, title, releaseDate, originalLanguage, adult, voteCount, voteAverage, overview, key }) => ({
    type: MOVIE_DETAILS,
    payload: {
        id,
        details: {
            posterPath,
            title,
            releaseDate,
            originalLanguage,
            adult,
            voteCount,
            voteAverage,
            overview,
            id,
            key,
        }
    }
})

export const setFavoritesAction = (favorites) => ({
    type: FAVORITES,
    payload: favorites
})

export const setWatchLaterAction = (watchLaterArray) => ({
    type: WATCH_LATER,
    payload: watchLaterArray
})


export const movieSpecificationsAction = ({ id, genres, adult, runtime, backdropPath, title, imdbID, movieID, releaseDate }) => ({
    type: MOVIE_SPECIFICATIONS,
    payload: {
        id,
        details: {
            genres,
            adult,
            runtime,
            backdropPath,
            title,
            imdbID,
            movieID,
            releaseDate
        }
    }
})





