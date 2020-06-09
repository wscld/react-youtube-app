import axios from 'axios';

const KEY = "AIzaSyClj146gvX6rdS6GCohoQXtiCrk52TjV8A";

export const findVideos = async (q, pageToken) => {
    try {
        let response = await axios({
            method: 'get',
            url: 'https://5ee0106a9ed06d001696dac4.mockapi.io/search',
            params: {
                part: "id,snippet",
                key: KEY,
                q,
                pageToken
            }
        });
        return response.data;
    } catch (err) {
        throw Error(err);
    }
}

export default { findVideos };