import styled from "styled-components"
import { loginUrl } from "../components/spotify"

const LoginContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 16px;
	margin: auto;
	padding: 16px;
	height: 100vh;
	width: 100%;
	max-width: 960px;
	box-sizing: border-box;
`

const LoginButton = styled.a`
	background-color: var(--spotify-green);
	width: fit-content;
	padding: 8px;
	border-radius: 8px;
	text-decoration: none;
	transition: 0.2s ease-in-out;
	box-shadow: 0;

	&:hover {
		box-shadow: var(--small-shadow);
	}
`

export default function Login() {
	return (
		<LoginContainer>
			<h1>spotify-remote</h1>
			<p>
				As the name suggests, this app can control your Spotify playback. Be
				aware that some functions may require Spotify Premium subscription. For
				the purpose it will need the following permissions:
			</p>
			<ul>
				<li>Read access to user’s email address.</li>
				<li>
					Read access to user’s subscription details (type of user account).
				</li>
				<li>Read access to a user’s currently playing content.</li>
				<li>Read access to a user’s player state.</li>
				<li>Write access to a user’s playback state.</li>
			</ul>
			<p>
				Please make sure your Spotify is currently playing or has recently been
				playing to be able to populate the app with data.
			</p>
			<LoginButton href={loginUrl}>Login with Spotify</LoginButton>
		</LoginContainer>
	)
}
