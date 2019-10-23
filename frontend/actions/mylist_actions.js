import * as myListActions from '../util/mylist_api_util';

export const FETCH_MYLISTS = "FETCH_MYLISTS";
export const CREATEMYLIST = "CREATEMYLIST";
export const DELETEMYLIST = "DELETEMYLIST";


const fetchMyLists = videos => {
    return {
        type: FETCH_MYLISTS,
        videos
    }
}

const createList = videoId => {
    return{
        type: CREATEMYLIST,
        videoId
    }
}

const deleteList = videoId => {
    return{
        type: DELETEMYLIST,
        videoId
    }
}

export const createMyList = videoId => {
    myListActions.updateMyList(videoId).then(() => dispatch(createList(videoId)))
}

export const deleteMyList = id => {
    myListActions.deleteMyList(id).then(videoId => dispatch(deleteList(videoId)))
}