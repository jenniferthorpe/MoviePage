/* eslint-disable camelcase */
import React from 'react';

export class MyDb extends React.Component {
  static getFavorite() {
    return MyDb.getFavorites();
  }

  static addFavorite({ posterPath, title, releaseDate, originalLanguage, voteCount, voteAverage, overview, movieID, sessionID }) {
    return MyDb.postFavorite({ posterPath, title, releaseDate, originalLanguage, voteCount, voteAverage, overview, movieID, sessionID })
  }

  static removeFavorite({ movieID, sessionID }) {
    return MyDb.deleteFavorite({ movieID, sessionID })
  }

  static addFavoritesBulk(newObjArr) {
    return MyDb.postFavoritesBulk(newObjArr)
  }




  static async getFavorites() {
    return fetch('http://localhost:4500/v1/all')
  }

  static async postFavorite({ posterPath, title, releaseDate, originalLanguage, voteCount, voteAverage, overview, movieID, sessionID }) {
    return fetch('http://localhost:4500/v1/new/favorite', {
      method: 'POST',
      body: JSON.stringify(
        {
          posterPath,
          title,
          releaseDate,
          originalLanguage,
          voteCount,
          voteAverage,
          overview,
          movieID,
          sessionID
        },
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  static async deleteFavorite({ movieID, sessionID }) {
    return fetch('http://localhost:4500/v1/delete/favorite', {
      method: 'DELETE',
      body: JSON.stringify(
        {
          movieID,
          sessionID
        },
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    )
  }

  static async postFavoritesBulk(newObjArr) {
    return fetch('http://localhost:4500/v1/add/favorites', {
      method: 'POST',
      body: JSON.stringify(
        newObjArr
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

}
