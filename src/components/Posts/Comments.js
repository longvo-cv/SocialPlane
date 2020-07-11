import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

//MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
const styles = (theme) => ({
  ...theme.spreadThis,
  commentImg: {
    maxWidth: '100%',
    height: 100,
    borderRadius: '50%',
    objectFit: 'cover'
  },

  commentData: {
    marginLeft: 20
  },
  contentColor: {
    color: '#C5C6C7'
  }
});
class Comments extends Component {
  render() {
    const { classes, comments } = this.props;
    return (
      <Grid container>
        {comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={userImage}
                      alt='comment'
                      className={classes.commentImg}
                    />
                  </Grid>
                  <Grid item sm={9} className={classes.contentColor}>
                    <div className={classes.commentData}>
                      <Typography
                        variant='h5'
                        component={Link}
                        to={`/users/${userHandle}`}
                        color='secondary'
                      >
                        {userHandle}
                      </Typography>
                      <Typography variant='body2'>
                        {dayjs(createdAt).format('h:mm a, MMMM  DD YYYY')}
                      </Typography>
                      <hr className={classes.separator} />
                      <Typography variant='body1'>{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}
Comments.propTypes = {
  comments: PropTypes.array.isRequired
};
export default withStyles(styles)(Comments);
