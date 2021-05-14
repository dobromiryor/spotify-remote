import { useEffect, useState } from "react"
import axios from "axios"

export default function useAuth(code) {
	const [accessToken, setAccessToken] = useState()

	useEffect(() => {
		axios
			.post("https://spotify-remote-dy.herokuapp.com/login", { code })
			.then((response) => {
				window.history.pushState({}, null, "/")

				setAccessToken(response.data.accessToken)
			})
			.catch(() => {
				window.location = "/"
			})
	}, [code])

	return accessToken
}
