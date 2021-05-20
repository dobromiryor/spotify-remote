import styled from "styled-components"

const MediaContainer = styled.div`
	display: flex;
	flex-direction: column;

	gap: 16px;

	@media (min-width: 700px) {
		flex-direction: row;

		margin: auto 0 32px 0;
	}
	@media (min-width: 992px) {
		gap: 32px;
	}
`

const AlbumArt = styled.img`
	min-width: 128px;
	min-height: 128px;
	max-width: 640px;
	max-height: 640px;

	@media (min-width: 700px) {
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
		align-self: initial;

		max-width: ${() => (window.devicePixelRatio > 1 ? "240px" : "480px")};
		max-height: ${() => (window.devicePixelRatio > 1 ? "240px" : "480px")};
	}
`

const TrackInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	gap: 8px;

	width: 100%;
	cursor: default;

	@media (min-width: 700px) {
		justify-content: flex-end;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
	}
`

const TrackName = styled.p`
	font-size: 1.2rem;
	font-weight: bold;

	@media (min-width: 700px) {
		font-size: 2.5rem;
	}
	@media (min-width: 992px) {
		font-size: 3rem;
	}
`

const TrackArtists = styled.div`
	display: flex;
	flex-wrap: wrap;

	font-size: 1rem;

	@media (min-width: 700px) {
		font-size: 1.5rem;
		font-weight: bold;
		opacity: 0.75;
	}
	@media (min-width: 992px) {
		font-size: 2rem;
	}
`

const TrackArtist = styled.p`
	&:nth-last-child(n + 2):after {
		content: ", ";
		white-space: pre;
	}
`

export default function Media({
	album,
	albumArts,
	artists,
	trackName,
	playback,
}) {
	if (playback) {
		return (
			<MediaContainer>
				<AlbumArt src={albumArts[0].url} alt="album art" title={album.name} />
				<TrackInfo>
					<TrackName aria-label="track name">{trackName}</TrackName>
					<TrackArtists aria-label="artists list">
						{artists.map((artist, index) => (
							<TrackArtist key={`artist-${index}`}>{artist.name}</TrackArtist>
						))}
					</TrackArtists>
				</TrackInfo>
			</MediaContainer>
		)
	}
}
