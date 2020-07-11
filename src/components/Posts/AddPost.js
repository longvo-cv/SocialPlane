import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../utils/MyButton';
//Mui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
//redux
import { connect } from 'react-redux';
import { addPost, clearErrors } from '../../redux/actions/dataActions';
const styles = (theme) => ({
  ...theme.spreadThis,
});
class AddPost extends Component {
  state = {
    open: false,
    body: '',
    errors: {}
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.ui.errors) {
      this.setState({
        errors: nextProps.ui.errors
      });
    }
    if (!nextProps.ui.errors && !nextProps.ui.loading) {
      this.setState({
        body: '',
        open: false, 
        errors: {} 
      });
        
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addPost({ body: this.state.body });
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      ui: { loading }
    } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip='Add a post'>
          <AddIcon color='secondary' />
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
          <DialogTitle className={classes.pageTitle}>
            Add a new post
          </DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name='body'
                type='text'
                label='Content'
                rows='3'
                placeholder='New post'
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
                variant='filled'
              />
              <Button
                type='submit'
                variant='outlined'
                color='secondary'
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={25}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
AddPost.propTypes = {
  addPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  ui: state.ui
});
export default connect(
  mapStateToProps,
  { addPost, clearErrors }
)(withStyles(styles)(AddPost));
