import axioApi from './../../axioConfig';
export function getPosts () {  // redux_step2 In actions, get datas. After get datas send to 'Reducer'
    return (dispatch) => {
        axioApi.get('posts').then((res) => {
            let posts = res.data
            dispatch({type:'VIEW_POSTS', payload : posts}) // this code is sending to reducers with keyword VIEW_POSTS
        })
        .catch((err) => {
            dispatch({type:'VIEW_POSTS_ERR', err})
        })
    }
}