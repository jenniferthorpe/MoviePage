/* eslint-disable camelcase */
import React from 'react';

export class MyDb extends React.Component {
  static getFavorite() {
    return MyDb.getFavorites();
  }

  static addFavorite({ poster_path, title, release_date, original_language, vote_count, vote_average, overview, movieID, sessionID }) {
    return MyDb.postFavorite({ poster_path, title, release_date, original_language, vote_count, vote_average, overview, movieID, sessionID })
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

  static async postFavorite({ poster_path, title, release_date, original_language, vote_count, vote_average, overview, movieID, sessionID }) {
    return fetch('http://localhost:4500/v1/new/favorite', {
      method: 'POST',
      body: JSON.stringify(
        {
          poster_path,
          title,
          release_date,
          original_language,
          vote_count,
          vote_average,
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
