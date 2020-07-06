import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../utils/MyButton';
import { likePost, unlikePost } from '../redux/actions/dataActions';
import { Link } from 'react-router-dom';
//Mui card
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeletePost from './DeletePost'
var relativeTime = require('dayjs/plugin/relativeTime');

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
    background: '#1f2833',
    color: '#C5C6C7'
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  },
  dateColor: {
    color: '$45a29e'
  }
};
class Whisper extends Component {
  likedPost = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.postId === this.props.whisper.postId
      )
    )
      return true;
    else return false;
  };
  likePost = () => {
    this.props.likePost(this.props.whisper.postId);
  };
  unlikePost = () => {
    this.props.unlikePost(this.props.whisper.postId);
  };
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      whisper: {
        body,
        createdAt,
        userImage,
        userHandle,
        postId,
        likeCount,
        commentCount
      },
      user: { authenticated,credentials:{handle} }
    } = this.props;
    const deleteButton = authenticated && userHandle === handle  ? (
      <DeletePost postId = {postId}/>
    ) : 
    null
    const likeButton = !authenticated ? (
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
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title='Profile image'
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant='h5'
            component={Link}
            to={`/users/${userHandle}`}
            color='secondary'
          >
            {userHandle}
          </Typography>
          {deleteButton}

          <Typography variant='body2' className={classes.dateColor}>
            {dayjs(createdAt).fromNow()}
          </Typography>

          <Typography variant='body1'>{body}</Typography>
          {likeButton}
          <span>{likeCount} likes</span>
          <MyButton tip='comments'>
            <ChatIcon color='secondary' />
          </MyButton>

          <span>{commentCount} comments</span>
        </CardContent>
      </Card>
    );
  }
}
Whisper.propTypes = {
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  whisper: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
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
)(withStyles(styles)(Whisper));
