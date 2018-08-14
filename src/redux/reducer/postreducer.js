const initialState = {
    posts: [],
    post: {}
}
export default (state=initialState, action) => {
    switch (action.type) {
        case 'VIEW_POSTS' :
          return {
              ...state,
              posts: action.posts
          }
        case 'VIEW_POST':
          return {
              ...state,
              post: action.post
          }
        default:
          return state
    }
}