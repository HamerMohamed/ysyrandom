const { Router } = require('express');
const router = Router();
const spotifyApi = require('../controllers/spotify-api');
const ysy = '2qWK8K2Jfh67UqtwY8tCW6';

router.get('/', (req, res)=>{
    console.log('New user');
    res.send("It's working");
});


router.get('/name', (req, res)=>{
    spotifyApi.getName((response)=>{
        if(res)
        {
            res.send(response);
        }
    });
});

router.get('/albums', (req, res)=>{
    spotifyApi.getAlbums((response)=>{
        if(response)
        {
            let list = '';

            response.items.forEach(item => {
                list += ("\n"+item.name);
            });

            res.send(list);
        }
    });
});

router.get('/randomAlbum', (req, res)=>{
    spotifyApi.getAlbums((response)=>{
        if(response)
        {
            let album = response.items[Math.floor(Math.random() * response.items.length)].name

            res.send(album);
        }
    });
});

router.get('/randomSong/:artist', (req, res)=>{
    spotifyApi.getAlbums(req.params.artist, (err, response)=>{
        if(response && err == null)
        {
            let _album = response.items[Math.floor(Math.random() * response.items.length)]

            spotifyApi.getTracks(_album.id, (TRes)=>{
                let song = TRes.items[Math.floor(Math.random() * TRes.items.length)]
                res.send({
                    name: song.name,
                    album: _album.name,
                    link: song.external_urls.spotify,
                    image: _album.images[0].url
                });
            });
        }
    });
});

module.exports = router;