import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../utils/MyButton';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
//Mui card
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import ChatIcon from '@material-ui/icons/Chat';
import DeletePost from './DeletePost';

import PostDialog from './PostDialog';
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
  }
};
class Whisper extends Component {
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
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;
    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeletePost postId={postId} />
      ) : null;

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
          <LikeButton postId={postId} />
          <span>{likeCount} likes</span>
          <MyButton tip='comments'>
            <ChatIcon color='secondary' />
          </MyButton>

          <span>{commentCount} comments</span>
          <PostDialog
            postId={postId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}
Whisper.propTypes = {
  user: PropTypes.object.isRequired,
  whisper: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog:PropTypes.bool
};
const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Whisper));
