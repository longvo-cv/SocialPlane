import { SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST,DELETE_POST } from '../types';
import axios from 'axios';


//get all posts
export const getPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios.get('/whispers').then((res) => {
    dispatch({ type: SET_POSTS, payload: res.data });
  }).catch(rr=>{
      dispatch({
          type:SET_POSTS,
          payload:[]
      })
  })
};

//like
export const likePost = (postId ) => dispatch =>{
    axios.get(`/whisper/${postId}/like`)
    .then(res =>{
        dispatch({
        type:LIKE_POST,
        payload:res.data})
    })
    .catch(err=>
        console.log(err))
}
//unlike
export const unlikePost = (postId) => dispatch => {
    axios.get(`/whisper/${postId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_POST,
                payload: res.data
            })
        })
        .catch(err =>
            console.log(err))
}

export const deletePost = (postId) => (dispatch) => {
         axios
           .delete(`/whisper/${postId}`)
           .then(() => {
             dispatch({ type: DELETE_POST, payload: postId });
           })
           .catch((err) => console.log(err));
       };