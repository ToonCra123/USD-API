### PLAYLIST REST API

# To get a playlist

To get a playlist you just need to make get request to `https://api.toonhosting.net/playlist/<playlist-id>`. It will then return the schema for the playlist.

# To create a playlist

URL: `https://api.toonhosting.net/playlist/create/`. 
JSON:
```json
{
    "title": "<title>",
    "description": "<description>"
}
```

# To add a song to a playlist
## Patch
URL: `https://api.toonhosting.net/playlist/<id>`. 
```json
{
    "title": "<title>", // optional
    "description": "<description>", // optional
    "song": "<song-id>
}
```



