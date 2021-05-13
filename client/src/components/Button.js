import styled from "styled-components"

const Buttons = styled.button`
	padding: 0;
	margin: 0;
	background-color: unset;
	border: none;
	opacity: 0.8;
	transition: 0.1s ease-in-out;

	width: 32px;
	height: 32px;

	cursor: pointer;

	&:hover {
		opacity: 1;
	}

	svg {
		fill: white;
		width: 16px;
		height: auto;
		pointer-events: none;
	}

	&#shuffle,
	&#repeat,
	&#previous,
	&#next {
		width: 32px;
		height: 32px;
	}

	&#play-pause {
		border-radius: 100%;
		background-color: white;
		padding: 16px;

		width: 48px;
		height: 48px;
		svg {
			fill: black;
		}
	}

	&.active {
		svg {
			fill: var(--spotify-green);
		}
	}
`

export default function Button({
	id,
	state,
	title,
	Icon,
	playback,
	spotifyApi,
}) {
	const handlePlayback = (e) => {
		if (e.target.id === "play-pause") {
			if (!playback.is_playing) {
				spotifyApi.play().then(
					function () {
						console.log("Playback started")
					},
					function (err) {
						//if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
						console.log("Something went wrong!", err)
					}
				)
			} else {
				spotifyApi.pause().then(
					function () {
						console.log("Playback paused")
					},
					function (err) {
						//if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
						console.log("Something went wrong!", err)
					}
				)
			}
		} else if (e.target.id === "previous") {
			spotifyApi.skipToPrevious().then(
				function () {
					console.log("Skip to previous")
				},
				function (err) {
					//if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
					console.log("Something went wrong!", err)
				}
			)
		} else if (e.target.id === "next") {
			spotifyApi.skipToNext().then(
				function () {
					console.log("Skip to next")
				},
				function (err) {
					//if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
					console.log("Something went wrong!", err)
				}
			)
		} else if (e.target.id === "shuffle") {
			if (e.target.getAttribute("data") === "false") {
				spotifyApi.setShuffle(true).then(
					function () {
						e.target.setAttribute("title", "Disable shuffle")
						if (!e.target.classList.contains("active")) {
							e.target.classList.add("active")
						}
						console.log("Shuffle is on.")
					},
					function (err) {
						//if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
						console.log("Something went wrong!", err)
					}
				)
			} else if (e.target.getAttribute("data") === "true") {
				spotifyApi.setShuffle(false).then(
					function () {
						if (e.target.classList.contains("active")) {
							e.target.classList.remove("active")
						}
						e.target.setAttribute("title", "Enable shuffle")
						console.log("Shuffle is off.")
					},
					function (err) {
						//if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
						console.log("Something went wrong!", err)
					}
				)
			}
		} else if (e.target.id === "repeat") {
			if (e.target.getAttribute("data") === "off") {
				spotifyApi.setRepeat("context").then(
					function () {
						if (!e.target.classList.contains("active")) {
							e.target.classList.add("active")
						}
						e.target.setAttribute("title", "Enable repeat")
						console.log("Repeat context.")
					},
					function (err) {
						//if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
						console.log("Something went wrong!", err)
					}
				)
			} else if (e.target.getAttribute("data") === "context") {
				spotifyApi.setRepeat("track").then(
					function () {
						if (!e.target.classList.contains("active")) {
							e.target.classList.add("active")
						}
						e.target.setAttribute("title", "Enable repeat track")
						console.log("Repeat track.")
					},
					function (err) {
						//if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
						console.log("Something went wrong!", err)
					}
				)
			} else if (e.target.getAttribute("data") === "track") {
				spotifyApi.setRepeat("off").then(
					function () {
						if (e.target.classList.contains("active")) {
							e.target.classList.remove("active")
						}
						e.target.setAttribute("title", "Disable repeat")
						console.log("Repeat is turned off.")
					},
					function (err) {
						//if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
						console.log("Something went wrong!", err)
					}
				)
			}
		}
	}

	return (
		<Buttons
			id={id}
			data={state}
			title={title}
			onClick={handlePlayback}
			className={
				state === "context" || state === "track" || state === "true"
					? "active"
					: ""
			}
		>
			<Icon />
		</Buttons>
	)
}
