const authEndpoint = "https://accounts.spotify.com/authorize"
const redirectUri = "http://localhost:3000/"
const clientId = "d787e68fe78a418a98496af361bbcb80"

const scopes = [
	"user-read-email",
	"user-read-private",
	"user-read-currently-playing",
	"user-read-playback-state",
	"user-modify-playback-state",
]

export const loginUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join(
	"%20"
)}`
