import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppLogo from '../images/airplane.png';
import { Link } from 'react-router-dom';
//MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
//import Icon from '@material-ui/core/Icon';

//redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';
const styles = (theme) => ({
  ...theme.spreadThis
});

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
      error: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.ui.errors) {
      this.setState({
        error: nextProps.ui.errors
      });
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };
    this.props.signupUser(newUserData, this.props.history);
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const {
      classes,
      ui: { loading }
    } = this.props;
    const { error } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppLogo} alt='WELCOME' className={classes.image} />
          <Typography
            variant='h2'
            className={classes.pageTitle}
            color='secondary'
          >
            Sign up
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id='email'
              name='email'
              type='email'
              label='Email'
              helperText={error.email}
              color='secondary'
              variant='filled'
              error={error.email ? true : false}
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id='password'
              name='password'
              type='password'
              label='Password'
              helperText={error.password}
              color='secondary'
              variant='filled'
              error={error.password ? true : false}
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              label='Confirm Password'
              helperText={error.confirmPassword}
              color='secondary'
              variant='filled'
              error={error.confirmPassword ? true : false}
              className={classes.textField}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id='handle'
              name='handle'
              type='text'
              label='Handle'
              color='secondary'
              variant='filled'
              helperText={error.handle}
              error={error.handle ? true : false}
              className={classes.textField}
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
            />
            {error.general && (
              <Typography variant='body2' className={classes.customError}>
                {error.general}
              </Typography>
            )}
            <Button
              type='submit'
              variant='outlined'
              color='secondary'
              className={classes.button}
              disabled={loading}
            >
              Submit
              {loading && (
                <CircularProgress size={25} className={classes.loadingIcon} />
              )}
            </Button>
            <br />
            <Typography
              variant='subtitle1'
              className={classes.linkText}
              color='secondary'
            >
              Already have an account? Log in <Link to='/login'>here</Link>
            </Typography>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}
signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui
});

export default connect(
  mapStateToProps,
  { signupUser }
)(withStyles(styles)(signup));
