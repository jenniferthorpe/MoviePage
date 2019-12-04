import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import MovieCard from './MovieCard'

class Favorites extends Component {
    static propTypes = {
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired,
        movieDetails: PropTypes.shape({
            posterPath: PropTypes.string,
            title: PropTypes.string,
            releaseDate: PropTypes.string,
            originalLanguage: PropTypes.string,
            overview: PropTypes.string,
            adult: PropTypes.bool,
            id: PropTypes.number,
            voteAverage: PropTypes.number,
            voteCount: PropTypes.number,
        }),
        sessionID: PropTypes.string.isRequired,
        favorites: PropTypes.shape({
            result: PropTypes.shape({
                favorites: PropTypes.arrayOf(PropTypes.number)
            }).isRequired,
            entities: PropTypes.shape({
                favorites: PropTypes.shape({
                    posterPath: PropTypes.string,
                    title: PropTypes.string,
                    releaseDate: PropTypes.string,
                    originalLanguage: PropTypes.string,
                    overview: PropTypes.string,
                    adult: PropTypes.bool,
                    id: PropTypes.number,
                    voteAverage: PropTypes.number,
                    voteCount: PropTypes.number,
                })
            })
        }).isRequired,
    }


    async componentDidMount() {
        const { history, sessionID } = this.props;

        if (sessionID === '') {
            history.push('/login')
        }

    }


    render() {
        const {
            favorites: {
                result: { favorites: favoritesArr },
                entities: { favorites: favoritesObj }
            },
        } = this.props;

        if (favoritesArr) {

            return favoritesArr.map(movieID => {
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
                } = favoritesObj[movieID]

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


        return <div style={{ textAlign: 'center' }}> You don´t have any favourites yet.</div >;
    }

}
const mapState = (state) => ({
    movieDetails: state.userInfo.movieDetailsByID,
    sessionID: state.userInfo.sessionID,
    favorites: state.userInfo.favorites,
})

export default connect(mapState)(withRouter(Favorites));
