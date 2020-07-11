import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../utils/MyButton';
import { likePost, unlikePost } from '../../redux/actions/dataActions';
import { Link } from 'react-router-dom';
//Mui card
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
export class LikeButton extends Component {
  likedPost = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find((like) => like.postId === this.props.postId)
    )
      return true;
    else return false;
  };
  likePost = () => {
    this.props.likePost(this.props.postId);
  };
  unlikePost = () => {
    this.props.unlikePost(this.props.postId);
  };
  render() {
    const { authenticated } = this.props.user;
    const LikeButton = !authenticated ? (
      <Link to='/login'>
        <MyButton tip='Like'>
          <FavoriteBorderIcon color='secondary' />
        </MyButton>
      </Link>
    ) : this.likedPost() ? (
      <MyButton tip='Undo like' onClick={this.unlikePost}>
        <FavoriteIcon color='secondary' />
      </MyButton>
    ) : (
      <MyButton tip='Like' onClick={this.likePost}>
        <FavoriteBorderIcon color='secondary' />
      </MyButton>
    );
    return LikeButton;
  }
}
LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  user: state.user
});
const mapActionsToProps = {
  likePost,
  unlikePost
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);
