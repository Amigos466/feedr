import callApi from '../utils/apiCaller';


export const GET_RSS_CHANNEL = 'GET_RSS_CHANNEL';
export const GET_CHANNELS_LIST = 'GET_CHANNELS_LIST';

// Functions

export function getChannel(url) {
    return (dispatch) => {
        return callApi('http://localhost:4025/api/getfeed', 'post', {
            params: {
                url: url,
            },
        }).then(res => dispatch(reciveRssChannel(res)));
    };
}


// RECIVERS

export function reciveRssChannel(data) {
    return {
        type: 'GET_RSS_CHANNEL',
        payload: data
    }

}