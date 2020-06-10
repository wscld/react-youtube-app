import axios from 'axios';

const key = process.env.REACT_APP_YOUTUBE_API;

export const findVideos = async (q, pageToken) => {
    try {
        let response = await axios({
            method: 'get',
            url: 'https://5ee0106a9ed06d001696dac4.mockapi.io/search',
            params: {
                part: "id,snippet",
                type:"video",
                key: key,
                q,
                pageToken
            }
        });
        return response.data;
    } catch (err) {
        throw Error(err);
    }
}

export const getVideo = async (id) => {
    try {
        let response = await axios({
            method: 'get',
            url: 'https://5ee0106a9ed06d001696dac4.mockapi.io/video',
            params: {
                part:'part=snippet,statistics',
                key: key,
                id
            }
        })
        return response.data;
    } catch (err) {
        throw Error(err);
    }
}

export default { findVideos,getVideo };