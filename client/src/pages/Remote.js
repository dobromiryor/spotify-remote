import { useState, useEffect } from "react"
import styled from "styled-components"
import useAuth from "../components/useAuth"
import SpotifyWebApi from "spotify-web-api-node"

import Profile from "../components/Profile"
import Media from "../components/Media"
import Controls from "../components/Controls"

const spotifyApi = new SpotifyWebApi({
	clientId: "d787e68fe78a418a98496af361bbcb80",
})

const BlurredBackground = styled.div`
	height: 100vh;
	width: 100vw;
	background-image: url(${(props) => props.image});
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
	position: relative;
`

const RemoteContainer = styled.div`
	position: absolute;
	box-sizing: border-box;
	width: 100vw;
	height: 100%;
	padding: 24px;

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	background-color: rgba(0, 0, 0, 0.66);
	backdrop-filter: blur(16px);

	@media (min-width: 400px) {
		padding: 32px;
	}
`

const LoadingContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	width: 100vw;
	height: 100vh;
`

const Loading = styled.div`
	border: 16px solid rgba(255, 255, 255, 0.3);
	border-top: 16px solid var(--spotify-green);
	border-radius: 100%;
	width: 128px;
	height: 128px;
	animation: spin 2s linear infinite;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`

export default function Remote({ code }) {
	const [playback, setPlayback] = useState({})
	const [artists, setArtists] = useState()
	const [artistData, setArtistData] = useState()
	const [album, setAlbum] = useState({})
	const [albumArts, setAlbumArts] = useState([{}, {}, {}])
	const [trackName, setTrackName] = useState("")
	const [duration, setDuration] = useState(1)
	const [progress, setProgress] = useState(1)

	const accessToken = useAuth(code)

	useEffect(() => {
		if (typeof progress === "string") {
			spotifyApi.seek(progress).then(
				function () {
					console.log(`Seek to ${progress}ms`)
				},
				function (err) {
					//if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
					console.log("Something went wrong!", err)
				}
			)
		}
	}, [progress])

	useEffect(() => {
		if (!accessToken) return

		spotifyApi.setAccessToken(accessToken)

		const interval = setInterval(() => {
			spotifyApi
				.getMyCurrentPlaybackState()
				.then(
					function (data) {
						setPlayback(data.body)
						setArtists(data.body.item.artists)
						setAlbum(data.body.item.album)
						setAlbumArts(data.body.item.album.images)
						setTrackName(data.body.item.name)
						setProgress(Number(data.body.progress_ms))
						setDuration(Number(data.body.item.duration_ms))

						return data.body.item.artists[0]
					},
					function (err) {
						console.log("Something went wrong!", err)
					}
				)
				.then((artist) => {
					return spotifyApi.getArtist(artist.id).then((data) => {
						setArtistData(data.body)
					})
				})
		}, 1000)

		return () => clearInterval(interval)
	}, [accessToken])

	return artistData ? (
		<BlurredBackground image={artistData.images[0].url}>
			<RemoteContainer>
				<Profile accessToken={accessToken} spotifyApi={spotifyApi} />
				<Media
					playback={playback}
					artists={artists}
					album={album}
					albumArts={albumArts}
					trackName={trackName}
				/>
				<Controls
					accessToken={accessToken}
					spotifyApi={spotifyApi}
					playback={playback}
					progress={progress}
					setProgress={setProgress}
					duration={duration}
				/>
			</RemoteContainer>
		</BlurredBackground>
	) : (
		<LoadingContainer>
			<Loading />
		</LoadingContainer>
	)
}
