# spotify-remote

Remote app for Spotify.

App uses [spotify-web-api-node](https://www.npmjs.com/package/spotify-web-api-node) for authentication/authorization.

Live app can be found [here](https://spotify-remote-dy.herokuapp.com/).

## Run locally

### Create a new spotify app

You'll need to create a new Spotify app through their [dashboard](https://developer.spotify.com/dashboard/applications) to get a new Client ID and Client Secret. In the app settings add `http://localhost:3000/` to the Redirect URIs.

### Changes to server

**EITHER** make a .env file **OR** hard code the ID and Secret into `server.js`

#### EITHER .env

Make a new .env file in the root directory containing:

```
CLIENT_ID="< insert Client ID here >"
CLIENT_SECRET="< insert Client Secret here >"
REDIRECT_URI="http://localhost:3000/"
```

#### OR Hard code ID and Secret into `server.js`

On line 13:

```
const credentials = {
	clientId: "< insert Client ID here >",
	clientSecret: "< insert Client Secret here >",
	redirectUri: "http://localhost:3000/",
}
```

#### Comment out / uncomment lines in `server.js`

##### Comment out lines:

- 20
- 49
- 50
- 51

##### Uncomment lines:

- 22
- 23
- 24

### Changes to client

#### useAuth.js

`useAuth.js` can be found in `client/components/useAuth.js`

Change line 9 to:

```
.post("http://localhost:8000/login", { code })
```

#### spotify.js

`spotify.js` can be found in `client/components/spotify.js`

Change lines 2 and 3 to:

```
const redirectUri = "http://localhost:3000/"
const clientId = "< insert Client ID here >"
```

#### Remote.js

`Remote.js` can be found in `client/pages/Remote.js`

Change line 11 to:

```
clientId: "< insert Client ID here >",

```

### Running the server and the client

```
npm install
node server.js
```

```
cd client
npm install
npm start
```

Client should be at `http://localhost:3000/` and server at `http://localhost:8000/`

## Screenshots

![Welcome screen](https://user-images.githubusercontent.com/32433021/118310329-22480880-b4f7-11eb-88be-5460bbd3671c.png)

![Remote screen](https://user-images.githubusercontent.com/32433021/118310253-06446700-b4f7-11eb-8395-31977eea97cf.png)
