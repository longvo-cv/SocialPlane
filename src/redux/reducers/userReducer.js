import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_POST,
  UNLIKE_POST
} from '../types';

const initState = {
  authenticated: false,
  credentials: {},
  likes: [],
  loading: false,
  notifications: []
};
export default function(state = initState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case LIKE_POST:
      return {
        ...state,
        likes:[
          ...state.likes,
          {
            userHandle:state.credentials.handle,
            postId: action.payload.postId
          }
        ]

      };
    case UNLIKE_POST:
      return {
        ...state,
        likes:state.likes.filter(like=> like.postId !== action.payload.postId)
      };
    default:
      return state;
  }
}
