import React from 'react'

export class TMDBApi extends React.Component {

  static getTrending({ timeWindow, page }) {
    return TMDBApi.fetchData({ url: 'trending/movie/', parameters: timeWindow, url2: '', queryString: `page=${page}` });
  }

  static getMovieDetails({ movieID }) {
    return TMDBApi.fetchData({ url: 'movie/', parameters: movieID })
  }

  static getReviews({ movieID }) {
    return TMDBApi.fetchData({ url: 'movie/', parameters: movieID, url2: '/reviews' })
  }

  static getSimilar({ movieID, page }) {
    return TMDBApi.fetchData({ url: 'movie/', parameters: movieID, url2: '/similar', queryString: `page=${page}` })
  }

  static logInToken() {
    return TMDBApi.fetchData({ url: 'authentication/token/new' })
  }

  static logInResponse({ username, password, token }) {
    return TMDBApi.postData({ url: 'authentication/token/validate_with_login', username, password, token })
  }

  static getSessionID({ token }) {
    return TMDBApi.postData({ url: 'authentication/session/new', token })
  }

  static getTrailerVideo({ movieID }) {
    return TMDBApi.fetchData({ url: 'movie/', parameters: movieID, url2: '/videos' })
  }

  static searchResults({ query }) {
    return TMDBApi.fetchData({ url: 'search/movie/', queryString: `query=${query}` })
  }

  static getFavorites({ sessionID }) {
    return TMDBApi.fetchData({ url: 'account/{account_id}/favorite/movies', queryString: `session_id=${sessionID}` })
  }

  static addFavorite({ sessionID, movieID, bool }) {
    return TMDBApi.postDataLists({ url: 'account/{account_id}/favorite', queryString: `session_id=${sessionID}`, movieID, bool })
  }

  static getWatchLater({ sessionID }) {
    return TMDBApi.fetchData({ url: 'account/{account_id}/watchlist/movies', queryString: `session_id=${sessionID}` })
  }

  static addWatchLater({ sessionID, movieID, bool }) {
    return TMDBApi.postDataLists2({ url: 'account/{account_id}/watchlist', queryString: `session_id=${sessionID}`, movieID, bool })
  }




  static async fetchData({ url = '', parameters = '', url2 = '', queryString = '' }) {
    return fetch(`http://localhost:4500/tmdb/v3/${url}${parameters}${url2}?${queryString}`).then(response => response.json());
  }

  static async postData({ url = '', parameters = '', url2 = '', queryString = '', username = '', password = '', token = '' }) {
    return fetch(`http://localhost:4500/tmdb/v3/${url}${parameters}${url2}?${queryString}`, {
      method: 'POST',
      body: JSON.stringify(
        {
          'username': username,
          'password': password,
          'request_token': token,
        }
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  static async postDataLists({ url = '', parameters = '', url2 = '', queryString = '', movieID = '', bool = '' }) {
    return fetch(`http://localhost:4500/tmdb/v3/${url}${parameters}${url2}?${queryString}`, {
      method: 'POST',
      body: JSON.stringify(
        {
          'media_type': 'movie',
          'media_id': Number(movieID),
          'favorite': bool
        }
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  static async postDataLists2({ url = '', parameters = '', url2 = '', queryString = '', movieID = '', bool = '' }) {
    return fetch(`http://localhost:4500/tmdb/v3/${url}${parameters}${url2}?${queryString}`, {
      method: 'POST',
      body: JSON.stringify(
        {
          'media_type': 'movie',
          'media_id': Number(movieID),
          'watchlist': bool
        }
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    })

  }

}

