import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { TMDBApi } from './TMDBApi';

class TrailerVideo extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired
  };

  state = {
    results: []
  };

  async componentDidMount() {
    const { id: movieID } = this.props;

    const { results } = await TMDBApi.getTrailerVideo({ movieID })

    this.setState({
      results
    });
  }

  render() {
    const { results } = this.state;

    if (results.length > 0) {
      const [{ key: videoKey }] = results;

      return (
        <ReactPlayer
          url={`https://www.youtube.com/embed/${videoKey}`}
          width='100%'
          height="750px"
        />
      );
    }

    return null;
  }
}

export default TrailerVideo;
