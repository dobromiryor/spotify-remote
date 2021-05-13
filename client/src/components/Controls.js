import styled from "styled-components"

import Progress from "./Progress"
import Button from "./Button"

import Shuffle from "../icons/shuffle.js"
import Previous from "../icons/previous.js"
import Pause from "../icons/pause.js"
import Play from "../icons/play.js"
import Next from "../icons/next.js"
import Repeat from "../icons/repeat.js"
import Repeat1 from "../icons/repeat1.js"

const ControlsContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 16px;
`

const ButtonsContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 16px;

	@media (min-width: 400px) {
		gap: 32px;
	}
`

export default function Controls({
	playback,
	spotifyApi,
	duration,
	progress,
	setProgress,
}) {
	return (
		<ControlsContainer>
			<Progress
				duration={duration}
				progress={progress}
				setProgress={setProgress}
			/>
			<ButtonsContainer>
				<Button
					id="shuffle"
					state={playback.shuffle_state ? "true" : "false"}
					title={playback.shuffle_state ? "Disable shuffle" : "Enable shuffle"}
					Icon={Shuffle}
					spotifyApi={spotifyApi}
					playback={playback}
				/>
				<Button
					id="previous"
					title="Previous"
					Icon={Previous}
					spotifyApi={spotifyApi}
					playback={playback}
				/>
				<Button
					id="play-pause"
					title={playback.is_playing ? "Pause" : "Play"}
					Icon={playback.is_playing ? Pause : Play}
					spotifyApi={spotifyApi}
					playback={playback}
				/>
				<Button
					id="next"
					title="Next"
					Icon={Next}
					spotifyApi={spotifyApi}
					playback={playback}
				/>
				<Button
					id="repeat"
					state={playback.repeat_state}
					title={
						playback.repeat_state === "off"
							? "Enable repeat"
							: playback.repeat_state === "context"
							? "Enable repeat one"
							: "Disable repeat"
					}
					Icon={playback.repeat_state === "track" ? Repeat1 : Repeat}
					spotifyApi={spotifyApi}
					playback={playback}
				/>
			</ButtonsContainer>
		</ControlsContainer>
	)
}
