import { UPDATE_SESSION_ID, UPDATE_USER } from './AppActions'

const initialState = {
    sessionID: undefined,
    firstName: undefined,
    lastName: undefined,
}

const appReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case UPDATE_SESSION_ID:
            return {
                ...state,
                sessionID: payload
            }

        case UPDATE_USER:
            return {
                ...state,
                // firstName: payload.firstName,
                // lastName: payload.lastName
                ...payload,
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
            return state

    }
}


const mapStateToProps = state => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }
}

export default appReducer
