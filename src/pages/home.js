import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Whisper from '../components/Posts/Whisper';
import Profile from '../components/Profile/Profile';
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';
import PropTypes from 'prop-types';
import PostSkeleton from '../utils/PostSkeleton'


class home extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.data;
    let recentPosts = !loading ? (
      posts.map((post) => <Whisper key={post.postId} whisper={post} />)
    ) : (
      <PostSkeleton/>
    /*   <Typography variant='subtitle2' color='secondary'>
        Loading...
      </Typography> */
    );
    //console.log(posts);
    return (
      <Grid container spacing={3}>
        <Grid item sm={8} xs={10}>
          {recentPosts}
        </Grid>
        <Grid item sm={4} xs={10}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  data: state.data
});
export default connect(
  mapStateToProps,
  { getPosts }
)(home);
