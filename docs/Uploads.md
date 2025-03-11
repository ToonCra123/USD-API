### UPLOADS REST API

# Upload a Song

To upload a song you must make a multipart form request to `https://api.toonhosting.net/upload/`.

The required fields are:

```json
{
    "image": "<file>",
    "mp3": "<file>",
    "title": "<title>",
    "description": "<description>",
    "year": "<year>"
}
```


# Profile Picture change

to change a profile make a request to `https://api.toonhosting.net/upload/change-pfp`, the following data is needed:

```json
{
    "image": "<file>",
    "username": "<username>",
    "password": "<password>"
}
```