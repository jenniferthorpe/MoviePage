import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import MovieCard from './MovieCard'

class WatchLater extends Component {
    static propTypes = {
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired,

        sessionID: PropTypes.string.isRequired,

        watchLater: PropTypes.shape({
            entities: PropTypes.shape({
                watchLater: PropTypes.shape({
                    poster_path: PropTypes.string,
                    title: PropTypes.string,
                    release_date: PropTypes.string,
                    original_language: PropTypes.string,
                    overview: PropTypes.string,
                    adult: PropTypes.bool,
                    id: PropTypes.number,
                    vote_average: PropTypes.number,
                    vote_count: PropTypes.number,
                })
            }),
            result: {
                watchLater: PropTypes.arrayOf(PropTypes.number).isRequired
            }
        }).isRequired,
    }


    async componentDidMount() {
        const { history, sessionID } = this.props;

        if (sessionID === '') {
            history.push('/login')
        }

    }


    render() {
        const { watchLater: {
            result: { watchLater: watchLaterArr },
            entities: { watchLater: watchLaterObj }
        } } = this.props;

        if (watchLaterArr) {

            return watchLaterArr.map(movieID => {
                const {
                    poster_path: posterPath,
                    title,
                    release_date: releaseDate,
                    original_language: originalLanguage,
                    adult,
                    vote_number: voteCount,
                    vote_average: voteAverage,
                    overview,
                    id
                } = watchLaterObj[movieID]

                return <MovieCard
                    src={posterPath}
                    title={title}
                    release={releaseDate}
                    lang={originalLanguage}
                    adult={adult}
                    voteNum={voteCount}
                    voteAvg={voteAverage}
                    overview={overview}
                    id={id}
                    key={id}
                />

            })

        }

        return <div style={{ textAlign: 'center' }}> You don´t have any movies in your list yet.</div >;
    }

}
const mapState = (state) => ({
    sessionID: state.userInfo.sessionID,
    watchLater: state.userInfo.watchLater,
})


export default connect(mapState)(withRouter(WatchLater));
