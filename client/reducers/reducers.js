import { GET_RSS_CHANNEL } from '../actions/actions';

const initialState = {
    rss_channel: {
        "items": [{"title": "null", "description": "null"}]
    }
};

export default function indexf(state = initialState, action) {
    switch (action.type) {
    case GET_RSS_CHANNEL:
        return {
            ...state,
            rss_channel: action.payload
        }

    default:
        return state;
    }
}

export const getRssChannel = state => state.rss_channel;