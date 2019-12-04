import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShowMoreText from 'react-show-more-text';
import { TMDBApi } from './TMDBApi';

class Reviews extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired
  };

  state = {
    reviews: []
  };

  async componentDidMount() {
    const { id: movieID } = this.props;

    const { results: reviews } = await TMDBApi.getReviews({ movieID });

    this.setState({
      reviews
    });
  }


  render() {
    const { reviews } = this.state;
    if (reviews.length > 0) {

      return reviews.map(({ author, content, id: reviewID }) => (
        <div key={reviewID} className='reviewBlock'>
          <div style={{ padding: '10px 40px 30px' }}>
            <h4 style={{ color: '#D7994D' }}>{author}</h4>
            <ShowMoreText
              lines={5}
              more="Show more"
              less="Show less"
              anchorClass="colorHref"
              onClick={this.executeOnClick}
              expanded={false}
            >
              {content}
            </ShowMoreText>
          </div>
        </div >
      )
      );
    }
    return <div>There are no reviews for this move yet</div >;

  }
}

export default Reviews;
