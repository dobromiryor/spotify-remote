import Login from "./pages/Login"
import Remote from "./pages/Remote"

function App() {
	const code = new URLSearchParams(window.location.search).get("code")

	return (
		<div className="App">
			{!code && <Login />}
			{code && <Remote code={code} />}
		</div>
	)
}

export default App
