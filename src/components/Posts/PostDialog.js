import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../utils/MyButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';

//Mui
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
//Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
//redux
import { connect } from 'react-redux';
import { getPost, clearErrors } from '../../redux/actions/dataActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  dialogContent: {
    padding: 20
  },
  profileImg: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  contentColor: {
    color: '#C5C6C7'
  },
  seePost: {
    position: 'absolute',
    left: '90%'
  },
  spinnerDiv: {
    position: 'relative',
    textAlign: 'center',
    padding: 'auto'
  },
  postLoadingSpinner: {
    color: '#66FCF1'
  }
});
class PostDialog extends Component {
  state = {
    open: false,
    oldPath: '',
    newPath: ''
  };
  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;
    const { userHandle, postId } = this.props;
    const newPath = `/users/${userHandle}/post/${postId}`;
    window.history.pushState(null, null, newPath);
    if (oldPath === newPath) oldPath = `/users/${userHandle}`;

    this.setState({ open: true, oldPath, newPath });
    this.props.getPost(this.props.postId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };
  render() {
    const {
      classes,
      post: {
        body,
        createdAt,
        userImage,
        userHandle,
        postId,
        likeCount,
        commentCount,
        comments
      },
      ui: { loading }
    } = this.props;
    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress
          size={175}
          thickness={2}
          className={classes.postLoadingSpinner}
        />
      </div>
    ) : (
      <Grid container spacing={14}>
        <Grid item sm={5}>
          <img src={userImage} alt='Profile' className={classes.profileImg} />
        </Grid>

        <Grid item sm={7} className={classes.contentColor}>
          <Typography
            component={Link}
            color='secondary'
            variant='h5'
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.separator} />
          <Typography variant='body2' className={classes.dateColor}>
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.separator} />
          <Typography variant='body1'>{body}</Typography>
          <LikeButton postId={postId} />
          <span>{likeCount} likes</span>
          <MyButton tip='comments'>
            <ChatIcon color='secondary' />
          </MyButton>

          <span>{commentCount} comments</span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm postId={postId} />
        <Comments comments={comments} />
      </Grid>
    );
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip='See post'
          tipClassName={classes.seePost}
        >
          <UnfoldMoreIcon color='secondary' />
        </MyButton>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
          PaperProps={{
            style: {
              backgroundColor: '#1f2833',
              boxShadow: 'none'
            }
          }}
        >
          <MyButton
            tip='close'
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon color='secondary' />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
PostDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  post: state.data.post,
  ui: state.ui
});
const mapActionsToProps = {
  getPost,
  clearErrors
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(PostDialog));
