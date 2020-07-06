import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../utils/MyButton';
import { deletePost } from '../redux/actions/dataActions';
//MUI
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
const styles = (theme) => ({
  ...theme.spreadThis
});
class DeletePost extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteThisPost = () => {
    this.props.deletePost(this.props.postId);
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip='delete post'
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutlineIcon color='secondary' />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.state.handleClose}
          fullWidth
          maxWidth='sm'
          PaperProps={{
            style: {
              backgroundColor: '#1f2833',
              boxShadow: 'none'
            }
          }}
        >
          <DialogTitle className={classes.deleteTitle}>
            Are you sure you want to delete this post?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>
            <Button onClick={this.deleteThisPost} color='secondary'>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
DeletePost.propTypes = {
    deletePost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
};
export default connect(
  null,
  { deletePost }
)(withStyles(styles)(DeletePost));
