import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Whisper from '../components/Posts/Whisper';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';
import StaticProfile from '../components/Profile/StaticProfile';
import Typography from '@material-ui/core/Typography';
import PostSkeleton from '../utils/PostSkeleton';
import ProfileSkeleton from '../utils/ProfileSkeleton';
class user extends Component {
  state = {
    profile: null,
    postIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const postId = this.props.match.params.postId;

    if (postId) {
      this.setState({ postIdParam: postId });
    }

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({ profile: res.data.user });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { posts, loading } = this.props.data;
    const {postIdParam} = this.state
    const postsMarkup = loading ? (
     <PostSkeleton/>
    ) : posts === null ? (
      <Typography variant='subtitle2' color='secondary'>
        No posts
      </Typography>
    ) : !postIdParam ?
        (
        posts.map((post) => <Whisper key={post.postId} whisper={post}></Whisper>)
        ):
        (
        posts.map((post) =>{
            if(post.postId !== postIdParam)
                return <Whisper key={post.postId} whisper={post}></Whisper>
            else return <Whisper key={post.postId} whisper={post} openDialog></Whisper>;
        } )
    )
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={10}>
          {postsMarkup}
        </Grid>
        <Grid item sm={4} xs={10}>
          {this.state.profile === null ? (
           <ProfileSkeleton/>
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}
user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  data: state.data
});
export default connect(
  mapStateToProps,
  { getUserData }
)(user);
