### USER REST DOCS

# Schema
```json
{
    "username": {
        "type": String,
        "unique": true,
        "required": true
    },
    "password": {
        "type": String,
        "require": true
    },
    "playlists": {
        "type": Array,
        "default": [],
        "require": false
    },
    profilePicture: {
        "type": String,
        "default": 'default.jpg',
        "require": false
    }
}
```


# Create a user:

To create a user, you must use `https://api.toonhosting.net/user/register` as the url for the post request. The body of the request must include:
```json
{
    "username": "<username>",
    "password": "<password>"
}
```
It will then result in json back, where it gives the Schema for the User, without the password. 