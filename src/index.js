import moment from 'moment';
import getInstagramStream from './instagram';
import getFacebookStream from './facebook';
import getYoutubeStream from './youtube';
import getTwitterStream from './twitter';

const deafultSecrets = {
    twitter: {
        accessToken: '',
        screenname: ''
    },
    facebook: {
        page: '',
        accessToken: ''
    },
    instagram: {
        userId: '',
        clientId: '',
        accessToken: ''
    },
    googleServiceAccount: {
        fileContents: '',
        scopes: [],
        email: ''
    },
    youtube: {
        playlistId: ''
    }
};

const chronologicalSorter = (x, y) => -1 * moment.utc(x.date).diff(moment.utc(y.date));

const applyEvenOddProperty = (post, i) => ({
    ...post,
    direction: i % 2 === 0 ? 'direction-r' : 'direction-l'
});

export default async (availableServices, secrets=deafultSecrets) => {
    const instagramStream = await availableServices.instagram
        ? getInstagramStream({ ...secrets.instagram }) : [];

    const facebookStream = await availableServices.facebook
        ? getFacebookStream({ ...secrets.facebook }) : [];

    const youTubeStream = await availableServices.youTube
        ? getYoutubeStream({ ...secrets.youtube, ... secrets.googleServiceAccount }) : [];

    const twitterStream = await availableServices.twitter
        ? getTwitterStream({ ...secrets.twitter }) : [];

    return []
        .concat(facebookStream)
        .concat(instagramStream)
        .concat(twitterStream)
        .concat(youTubeStream)
        .sort(chronologicalSorter)
        .map(applyEvenOddProperty);
};