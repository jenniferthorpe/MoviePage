import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { sessionIDAction, userInfoAction, setFavoritesAction, setWatchLaterAction } from '../actions/actions'
import { TMDBApi } from './TMDBApi';
import { MyDb } from './MyDb';

const form = {
    height: '20vh',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
}

const label = {
    textAlign: 'center',
    fontSize: '24px'
}

const input = {
    display: 'block',
    margin: '10px 20px 20px',
    padding: '9px',
    border: 'none',
    borderRadius: '2px'
}

const errorcode = {
    position: 'relative',
    textAlign: 'center',
    marginTop: '-40px',
    display: 'none'
}

const errorcode2 = {
    position: 'relative',
    textAlign: 'center',
    marginTop: '-40px',
    display: 'none'
}


class Login extends Component {
    errorCodeRef = React.createRef();

    errorCodeRef2 = React.createRef();

    static propTypes = {
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired,
        setSessionID: PropTypes.func.isRequired,
        setUsername: PropTypes.func.isRequired,
        setWatchLater: PropTypes.func.isRequired,
        setFavorites: PropTypes.func.isRequired,
    }

    state = {
        password: '',
        username: ''
    }

    handleUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleSubmit = async (e) => {
        const { password, username } = this.state;
        const { setSessionID, setUsername, setWatchLater, setFavorites, history } = this.props;

        e.preventDefault();

        if (username && password) {

            const { request_token: token } = await TMDBApi.logInToken();
            console.log(token);

            const response = await TMDBApi.logInResponse({ username, password, token });

            if (response.status === 200) {

                const responseSession = await TMDBApi.getSessionID({ token })

                if (responseSession.status === 200) {
                    const { session_id: sessionID } = await responseSession.json();
                    const { results: favorites } = await TMDBApi.getFavorites({ sessionID })
                    const { results: watchLater } = await TMDBApi.getWatchLater({ sessionID })

                    const newObjArr = favorites.map(({
                        poster_path,
                        title,
                        release_date,
                        original_language,
                        vote_count,
                        vote_average,
                        overview,
                        id: movieID,
                    }) => {
                        return {
                            poster_path,
                            title,
                            release_date,
                            original_language,
                            vote_count,
                            vote_average,
                            overview,
                            movieID,
                            sessionID
                        }
                    })

                    const bulkResponse = MyDb.addFavoritesBulk(newObjArr)

                    console.log(favorites);
                    console.log(newObjArr);

                    setSessionID(sessionID);
                    setUsername({ username });
                    setFavorites(favorites);
                    setWatchLater(watchLater);

                    history.push('/');
                }
                else {
                    // eslint-disable-next-line no-console
                    console.log(responseSession);
                }

            }
            else {
                this.errorCodeRef.current.style.display = 'block';
                this.errorCodeRef2.current.style.display = 'none';
            }
        }
        else {
            this.errorCodeRef2.current.style.display = 'block';
            this.errorCodeRef.current.style.display = 'none';
        }
    }




    render() {
        const { password, username } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit} style={form}>

                    <label htmlFor='username' style={label}>Username
                        <input name='username' type='text' value={username} onChange={this.handleUsername} style={input} />
                    </label>

                    <label htmlFor='password' style={label}>Password
                        <input name='password' type='password' value={password} onChange={this.handlePassword} style={input} />
                    </label>

                    <Button type='submit' value='login' style={{ margin: '39px 20px 20px', padding: '7px', border: '1px solid #D99A4E', fontSize: '20px' }}>Login </Button>
                </form>

                <div className='errorMessage' style={errorcode} ref={this.errorCodeRef2}>You need to provide both username and password</div>
                <div className='errorMessage' style={errorcode2} ref={this.errorCodeRef}>Wrong username or password</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.userInfo.username,
        sessionID: state.userInfo.sessionID,
        favorites: state.userInfo.favorites.entities.favorites,
        watchLater: state.userInfo.watchLater,
        movieDetails: state.userInfo.movieDetailsByID
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSessionID: (sessionID) => {
            return dispatch(sessionIDAction(sessionID))
        },
        setUsername: ({ username }) => {
            return dispatch(userInfoAction({ username }));
        },
        setFavorites: (favorites) => {
            return dispatch(setFavoritesAction(favorites))
        },
        setWatchLater: (watchLater) => {
            return dispatch(setWatchLaterAction(watchLater))
        },
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));