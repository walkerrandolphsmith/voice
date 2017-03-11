import moment from 'moment';
const request = require('google-oauth-jwt').requestWithJWT();

const makeRequest = (url, config) => new Promise((resolve, reject) => {
    request({ url: url, jwt: config }, (err, res, body) => {
        if(err) reject(err);
        else resolve(body);
    });
});

export default async({ playlistId, email, scopes, fileContents }) => {
    const queryString = `playlistItems?part=id&contentDetails&snippet&playlistId=${playlistId}`;
    const url = `https://www.googleapis.com/youtube/v3/${queryString}`;

    const config = {
        email,
        scopes,
        key: fileContents
    };

    const response = await makeRequest(url, config);

    return (JSON.parse(response).items || []).map(post => ({
        service: 'youtube',
        comments: [],
        likes: 0,
        avatar: 'assets/logo.png',
        name: post.snippet.channelTitle,
        message: post.snippet.title,
        picture: post.snippet.thumbnails['default'].url,
        video: post.contentDetails.videoId,
        date: moment(post.snippet.publishedAt, "YYYYMMDD").format('YYYY-MM-DD'),
        time: moment(post.snippet.publishedAt, "YYYYMMDD").fromNow()
    }));
};