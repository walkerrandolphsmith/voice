import axios from 'axios';
import moment from 'moment';

const getFacebookAvatar = (profileId) => `https://graph.facebook.com/${profileId}/picture?type=large`;

export default async({ pageId, accessToken }) => {
    const url = `https://graph.facebook.com/${pageId}/feed?access_token=${accessToken}`;

    const timeline = await axios.get(url);

    if(!timeline.data && !timeline.data.data) return [];

    return timeline.data.data.map(post => {
        if(!post.comments) post.comments = { data: [] };
        const comments = post.comments.data.map(comment => ({
            likes : comment.like_count,
            avatar : getFacebookAvatar(comment.from.id),
            name : comment.from.name,
            message : comment.message,
            picture : null,
            video : null,
            date : moment(post.created_time, 'YYYYMMDD').format('YYYY-MM-DD'),
            time : moment(post.created_time, 'YYYYMMDD').fromNow(),
            link : (comment.from.category
                ? 'http://facebook.com/profile.php?id='
                : 'https://www.facebook.com/app_scoped_user_id/') + comment.from.id
        }));
        return {
            service: 'facebook',
            likes : post.likes ? post.likes.data.length : 0,
            avatar : getFacebookAvatar(post.from.id),
            name : post.from.name,
            message : post.message,
            picture : post.picture || null,
            video : post.video || null,
            date : moment(post.created_time, 'YYYYMMDD').format('YYYY-MM-DD'),
            time : moment(post.created_time, 'YYYYMMDD').fromNow(),
            comments : comments
        }
    });
};