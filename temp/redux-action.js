const ACTION_PREFIX = 'APP'
export const UPDATE_SESSION_ID = ACTION_PREFIX + "/UPDATE_SESSION_ID"
export const UPDATE_USER = ACTION_PREFIX + "/UPDATE_USER"

export const updateSessionID = (sessionID) => ({
    type: UPDATE_SESSION_ID,
    payload: sessionID
})

export const updateUser = ({ firstName, lastName }) => ({
    type: UPDATE_USER,
    payload: {
        firstName,
        lastName
    }
})

