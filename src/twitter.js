import axios from 'axios';
import moment from 'moment';

export default async ({ accessToken, screenname }) => {
    const baseUrl = 'https://api.twitter.com';
    const timelineUrl = "/1.1/statuses/user_timeline.json";
    const repliesUrl = "/1.1/search/tweets.json";

    const dateFormat = 'dd MMM DD HH:mm:ss ZZ YYYY';
    const prettyDateFormat = 'YYYY-MM-DD';

    const instance = axios.create({
        baseURL: baseUrl,
        timeout: 1000,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    const timeline = await instance.get(timelineUrl, {
        params: {
            count: 100,
            screen_name: screenname
        }
    });

    if(!timeline.data) return [];

    const getProjection = (entity) => ({
        likes: entity.favorite_count,
        avatar: entity.user.profile_image_url,
        message: entity.text,
        picture: entity.entities.media && entity.entities.media[0] ? entity.entities.media[0].media_url : null,
        date: moment(entity.created_at, dateFormat, 'en').format(prettyDateFormat),
        time: moment(entity.created_at, dateFormat, 'en').fromNow(),
        video: null
    });

    return timeline.data.map(post => ({
        service: 'twitter',
        ...getProjection(post),
        comments: [],
        name: screenname,
        video: null
    }));
};
