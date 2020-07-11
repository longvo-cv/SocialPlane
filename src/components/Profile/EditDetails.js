import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../utils/MyButton'
//Mui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';

import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';
const styles = (theme) => ({
  ...theme.spreadThis,
  button: {
    float: 'right'
  },
  
});
class EditDetails extends Component {
  state = {
    bio: '',
    website: '',
    location: '',
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToSTate(this.props.credentials);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };
  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToSTate(credentials);
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  mapUserDetailsToSTate = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.website ? credentials.website : '',
      location: credentials.location ? credentials.location : ''
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        
        <MyButton tip='Edit details' onClick ={this.handleOpen} btnClassName={classes.button}>
        <EditIcon color='secondary'/>
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
          PaperProps={{
            style: {
              backgroundColor: '#1f2833',
              boxShadow: 'none',
            },
          }}
        >
          <DialogTitle className={classes.pageTitle}>Edit user details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name='bio'
                type='text'
                label='Bio'
                multiline
                rows='3'
                placeholder='A short bio about yourself'
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name='website'
                type='text'
                label='Website'
                placeholder='Your website'
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name='location'
                type='text'
                label='Location'
                placeholder='Your location'
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color='secondary'>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
  // mapUserDetailsToSTate: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  credentials: state.user.credentials
});

export default connect(
  mapStateToProps,
  { editUserDetails }
)(withStyles(styles)(EditDetails));
