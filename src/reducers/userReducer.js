/* eslint-disable no-case-declarations */
import { normalize, schema } from 'normalizr';

import { SESSIONID, USERINFO, FAVORITES, WATCH_LATER } from '../actions/actions'

const localData = {
  favorites: sessionStorage.getItem('favoriteStorage'),
  watchLater: sessionStorage.getItem('watchLaterStorage')
}

export const initialState = {
  sessionID: sessionStorage.getItem('sessionIDStorage') || '',
  username: undefined,
  favorites: localData.favorites ? JSON.parse(localData.favorites) : {
    entities: {},
    result: {
      favorites: []
    },
  },
  watchLater: localData.watchLater ? JSON.parse(localData.watchLater) : {
    entities: {},
    result: {
      watchLater: []
    }
  },
}

const favoriteEntity = new schema.Entity('favorites');
const mySchema = { favorites: [favoriteEntity] };
const watchLaterEntity = new schema.Entity('watchLater');
const mySchema2 = { watchLater: [watchLaterEntity] };


export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SESSIONID:
      sessionStorage.setItem('sessionIDStorage', payload);
      return {
        ...state,
        sessionID: payload,
      }

    case USERINFO:
      return {
        ...state,
        username: payload.username,
      }

    case FAVORITES:
      const myData = { favorites: payload };
      const normalizedData = normalize(myData, mySchema);

      sessionStorage.setItem('favoriteStorage', JSON.stringify(normalizedData));

      return {
        ...state,
        favorites: normalizedData,
      }


    case WATCH_LATER:
      const myData2 = { watchLater: payload };
      const normalizedData2 = normalize(myData2, mySchema2);

      sessionStorage.setItem('watchLaterStorage', JSON.stringify(normalizedData2));

      return {
        ...state,
        watchLater: normalizedData2,
      }

    default:
      return state;
  }
}