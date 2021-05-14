require("dotenv").config()
const express = require("express")
const path = require("path")
const cors = require("cors")
const spotifyWebApi = require("spotify-web-api-node")

const app = express()
const port = 8000

app.use(cors()) // To handle cross-origin requests
app.use(express.json()) // To parse JSON bodies

const credentials = {
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: process.env.REDIRECT_URI,
}

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "./client/build")))

// app.get("/", (req, res) => {
// 	console.log("Hello World!")
// })

app.post("/login", (req, res) => {
	//  setup
	let spotifyApi = new spotifyWebApi(credentials)

	//  Get the "code" value posted from the client-side and get the user's accessToken from the spotify api
	const code = req.body.code

	// Retrieve an access token
	spotifyApi
		.authorizationCodeGrant(code)
		.then((data) => {
			// Returning the User's AccessToken in the json formate
			res.json({
				accessToken: data.body.access_token,
			})
		})
		.catch((err) => {
			console.log(err)
			res.sendStatus(400)
		})
})

// All remaining requests return the React app, so it can handle routing.
app.get("*", function (request, response) {
	response.sendFile(path.resolve(__dirname, "./client/build", "index.html"))
})

app.listen(process.env.PORT || port, () => {
	console.log(`App listening`)
})
