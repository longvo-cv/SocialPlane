import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
//redux
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';
const styles = (theme) => ({
  ...theme.spreadThis
});
class CommentForm extends Component {
  state = {
    body: '',
    errors: {}
  };
  componentWillReceiveProps = (nextProps) => {
      if (nextProps.ui.errors) {
          this.setState({
              errors: nextProps.ui.errors
          });
      }
    if (!nextProps.ui.errors && !nextProps.ui.loading) {
      this.setState({ body: '' });
    }
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitComment(this.props.postId, { body: this.state.body });
  };
  render() {
    const { classes, authenticated } = this.props;
    const errors = this.state.errors;
    const commentFormMarkup = authenticated ? (
      <Grid item sm={12} style={{ textAlign: 'center' }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name='body'
            type='text'
            label='Type your comment'
            variant='filled'
            error={errors.Comment ? true : false}
            helperText={errors.Comment}
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
            className={classes.textField}
          ></TextField>
          <Button
            type='submit'
            variant='outlined'
            color='secondary'
            className={classes.button}
            // disabled={loading}
          >
            Submit
          </Button>
        </form>
        <hr className={classes.separator} />
      </Grid>
    ) : null;
    return commentFormMarkup;
  }
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
};
const mapStateToProps = (state) => ({
  ui: state.ui,
  authenticated: state.user.authenticated
});
export default connect(
  mapStateToProps,
  { submitComment }
)(withStyles(styles)(CommentForm));
