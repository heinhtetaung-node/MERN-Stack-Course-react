const initialState = {
    posts: [],
    post: {},
    tags: []
}
export default (state=initialState, action) => {
    switch (action.type) {
        case 'VIEW_POSTS' :  // redux_step3 In reducers, check condition and send data to 'Store' 
          return {
              ...state,
              posts: action.payload  // this code is sending to store
          }
        case 'VIEW_POST':
          return {
              ...state,
              post: action.post
          }
        case 'GET_TAGS':
          return {
              ...state,
              tags: action.payload
          }
        default:
          return state
    }
}