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

export default async (availableServices, secrets=deafultSecrets) => {
    const fns = [];
    if (availableServices.instagram) fns.push(() => getInstagramStream({ ...secrets.instagram }));
    if (availableServices.facebook) fns.push(() => getFacebookStream({ ...secrets.facebook }));
    if (availableServices.youTube) fns.push(() => getYoutubeStream({ ...secrets.youtube, ... secrets.googleServiceAccount }));
    if (availableServices.twitter) fns.push(() => getTwitterStream({ ...secrets.twitter }));
    
    const posts = await Promise.all(fns.map(fn => fn()));

    return posts.sort(chronologicalSorter);
};
