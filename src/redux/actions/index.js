import axioApi from './../../axioConfig';
export function getPosts () {
    return (dispatch) => {
        axioApi.get('posts').then((res) => {
            let posts = res.data
            dispatch({type:'VIEW_POSTS', posts})
        })
        .catch((err) => {
            dispatch({type:'VIEW_POSTS_ERR', err})
        })
    }
}