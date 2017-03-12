# Voice

Npm package to retrieve a individual's social streams. 


# Usage
```
const getTimeline = require('voice');

// Ignore a service by setting to false
const availableServices = {
    facebook: true,
    instagram: true,
    youTube: true,
    twitter: true
}

const secrets = {
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
}

getTimeline(availableServices, secrets)
    .then(timeline => {
        
    })
    .catch(err => {

    })
```



