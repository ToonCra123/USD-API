### SEARCHING

# Search Song

to search make a request to `https://api.toonhosting.net/search/song/?title=<title>`, this will return an array with queried songs limited at 10. You can include an additional parameter limit to make the limit higher. 

Ex without limit (Default 10):
`https://api.toonhosting.net/search/song/?title=Monkey`

Ex with limit:
`https://api.toonhosting.net/search/song/?title=Monkey&limit=50`

# Search Artist

to search make a request to `https://api.toonhosting.net/search/artist/?name=<name>`, this will return an array with queried songs limited at 10. You can include an additional parameter limit to make the limit higher. 

Ex without limit (Default 10):
`https://api.toonhosting.net/artist/song/?title=Daniel`

Ex with limit:
`https://api.toonhosting.net/artist/song/?name=Daniel&limit=50`

# Search for playlist

to search make a request to `https://api.toonhosting.net/search/playlist/?title=<title>`, this will return an array with queried playlists limited at 10. You can include an additional parameter limit to make the limit higher.

Ex without limit (Default 10):
`https://api.toonhosting.net/search/playlist/?title=Awesome`

Ex with limit:
`https://api.toonhosting.net/search/playlist/?title=Awesome&limit=50`


# Get trending songs

to search make a request to `https://api.toonhosting.net/search/trending/?limit=<limit>`

Ex: 
`https://api.toonhosting.net/search/trending/?limit=20`
