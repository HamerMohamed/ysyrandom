const SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi(
    {
        clientId:'d36c5e2f4f3140e6bfb23a0442eee89b',
        clientSecret:'19768a40ed16461587de558ad1d89c1b',
        redirectUri: 'http://localhost:3000'
    }
);

spotifyApi.clientCredentialsGrant().then((data, err)=>{
    if(err)
    {
        console.log(err);
    }

    if(data)
    {
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
    }
});


const getName = function(callback){
    spotifyApi.getArtist('2qWK8K2Jfh67UqtwY8tCW6', (err, res)=>{
        if(err)
        {
            console.log(err);
            return;
        }
        if(res)
        {
            callback(res.body.name);
        }
    });
}

const getAlbums = function(callback){
    spotifyApi.getArtistAlbums('2qWK8K2Jfh67UqtwY8tCW6').then((res)=>{
        if(res)
        {
            callback(res.body);
        }
    });
}

const getTracks = function(albumID, callback){
    spotifyApi.getAlbumTracks(albumID).then((res)=>{
        if(res)
        {
            callback(res.body);
        }
    });
}

module.exports = {
    getName,
    getAlbums,
    getTracks
}




