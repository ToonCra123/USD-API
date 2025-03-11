### USER REST DOCS

# Schema
```json
{
    "username": {
        "type": "String",
        "unique": true,
        "required": true
    },
    "password": {
        "type": "String",
        "require": true
    },
    "playlists": {
        "type": "Array",
        "default": [],
        "require": false
    },
    "profilePicture": {
        "type": "String",
        "default": "default.jpg",
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

# Access User Information

To access information regarding a specific user it would be a post request to `https://api.toonhosting.net/user/`. The following body is also neccessary:
```json
{
    "username": "<username>",
    "password": "<password>"
}
```

# Delete a User

To delete a user it would need to be a delete request to `https://api.toonhosting.net/user/`. The following body is also neccessary:
```json
{
    "username": "<username>",
    "password": "<password>"
}
```

# Change Password

To change a user's password you need to make a patch request to `https://api.toonhosting.net/user/`. The following body is also neccessary:
```json
{
    "username": "<username>",
    "password": "<password>",
    "newpass": "<newpass>"
}
```