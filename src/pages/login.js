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

//redux import
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  loadingIcon: {
    color: '#66FCF1'
  }
});

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
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
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
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
            Login
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
              variant='filled'
              helperText={error.password}
              error={error.password ? true : false}
              className={classes.textField}
              color='secondary'
              value={this.state.password}
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
              Don't have an account? Sign up <Link to='/signup'>here</Link>
              </Typography>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}
login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui
});
const mapActionsToProps = {
  loginUser
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
