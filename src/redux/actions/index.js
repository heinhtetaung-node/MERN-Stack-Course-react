import axioApi from './../../axioConfig';
export function getPosts () {  // redux_step2 In actions, get datas. After get datas send to 'Reducer'
    return (dispatch) => {
        axioApi.get('posts').then((res) => {
            let posts = res.data
            dispatch({type:'VIEW_POSTS', payload : posts}) // this code is sending to reducers with keyword VIEW_POSTS
        })
        .catch((err) => {
            dispatch({type:'VIEW_POSTS_ERR', payload : err})
        })
    }
}

export function getTags () {
    return (dispatch) => {
        axioApi.get('tags').then((res) => {
            dispatch({type:'GET_TAGS', payload : res.data})
        }).catch((err) => {
            dispatch({type:'GET_TAGS_ERR', payload : err})
        })
    }
}

export function savePost(postdata){
    return async (dispatch) => {
        let res 
        try{
            res = await axioApi.post('posttag', postdata);
        }catch(e){
            res = e;
        }
        return res.data;
    }
}