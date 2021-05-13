import * as ms from "pretty-ms"
import styled from "styled-components"

const msConfig = { colonNotation: true, secondsDecimalDigits: 0 }

const createShadows = () => {
	let shadows = ""
	let n = 3840 / 2
	for (let i = 3; i < n; i++) {
		shadows += `-${i * 2}px 0px 0px -5px var(--fill-color)`
		if (i !== n - 1) {
			shadows += `, `
		}
	}

	return shadows
}

const ProgressContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	width: 100%;
`

const TimeStampContainer = styled.div`
	display: flex;
	justify-content: space-between;

	font-size: 0.75rem;
	cursor: default;

	@media (min-width: 700px) {
		font-size: 1rem;
		opacity: 0.75;
	}
`

const ProgressSlider = styled.input`
	-webkit-appearance: none;
	appearance: none;
	display: flex;
	align-items: center;
	width: 100%;
	min-height: 12px;
	height: 100%;
	transition: 0.1s ease-in-out;
	background: none;
	overflow: hidden;
	margin: -8px 0;

	&:hover {
		&::-webkit-slider-runnable-track {
			overflow: visible;
		}
		&::-webkit-slider-thumb {
			--fill-color: var(--spotify-green);

			opacity: 1;
		}
		&::-moz-range-thumb {
			opacity: 1;
		}
		&::-moz-range-progress {
			background-color: var(--spotify-green);
		}
	}

	&::-webkit-slider-runnable-track {
		content: "";
		pointer-events: none;
		background-color: rgba(255, 255, 255, 0.5);
		height: 2px;
		overflow: hidden;
	}

	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 12px;
		height: 12px;
		border: none;
		border-radius: 100%;
		opacity: 1;
		background-color: white;
		--fill-color: #fff;
		box-shadow: ${createShadows()};
		margin-top: -5px;
		cursor: pointer;
		transition: 0.1s ease-in-out;
	}

	&::-moz-range-track {
		content: "";
		pointer-events: none;
		background-color: rgba(255, 255, 255, 0.5);
		height: 2px;
	}

	&::-moz-range-progress {
		background-color: rgba(255, 255, 255, 1);
		transition: 0.1s ease-in-out;
	}

	&::-moz-range-thumb {
		width: 12px;
		height: 12px;
		border-radius: 100%;
		opacity: 0;
		background-color: white;
		cursor: pointer;
		transition: 0.1s ease-in-out;
	}
`

export default function Progress({ progress, duration, setProgress }) {
	return (
		<ProgressContainer>
			{progress && (
				<ProgressSlider
					type="range"
					id="progress"
					name="progress"
					onChange={(e) => setProgress(e.target.value)}
					value={progress}
					min="0"
					max={duration}
					step="1000"
					aria-label="progress bar"
				/>
			)}
			<TimeStampContainer>
				<div aria-label="track progress">{ms(Number(progress), msConfig)}</div>
				<div aria-label="track duration">{ms(Number(duration), msConfig)}</div>
			</TimeStampContainer>
		</ProgressContainer>
	)
}
