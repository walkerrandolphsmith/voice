import axios from 'axios';

export default async({ userId, accessToken, clientId}) => {
    const apiEndpoint = `https://api.instagram.com/v1/users/${userId}/media/recent`;

    const timeline = await axios.get(apiEndpoint, {
        params: {
            access_token: accessToken,
            client_id: clientId,
            count: 10
        }
    });

    if(!timeline.data && !timeline.data.data) return [];

    return timeline.data.data.map(post => {
        if(!post.comments) post.comments = { data: [] };
        const comments = post.comments.data.map(comment => ({
            likes: comment.like_count,
            avatar: comment.from.profile_picture,
            name: comment.from.full_name,
            message: comment.text,
            picture: null,
            video: null,
            date: '',
            time: '',
            link: null
        }));
        return {
            service: 'instagram',
            likes: post.likes.count,
            avatar: post.user.profile_picture,
            name: post.user.username,
            message: post.caption.text,
            picture: post.images.thumbnail.url,
            video: post.video || null,
            date: '',
            time: '',
            comments: comments
        }
    });
};