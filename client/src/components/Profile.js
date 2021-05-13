import { useEffect, useState } from "react"
import styled from "styled-components"

const ProfileContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;

	font-size: 1rem;
	font-weight: bold;

	cursor: default;
`

const UserImage = styled.img`
	width: 32px;
	height: auto;
	border-radius: 100%;
`

export default function Profile({ accessToken, spotifyApi }) {
	const [displayName, setDisplayName] = useState("")
	const [userImage, setUserImage] = useState("")

	useEffect(() => {
		if (!accessToken) return

		spotifyApi.setAccessToken(accessToken)

		spotifyApi.getMe().then((data) => {
			setDisplayName(data.body.display_name)
			setUserImage(data.body.images[0].url)
		})
	}, [accessToken, spotifyApi])

	return (
		<ProfileContainer aria-label="profile">
			{userImage && <UserImage src={userImage} alt="profile" />}
			{displayName && <div>{displayName}</div>}
		</ProfileContainer>
	)
}
