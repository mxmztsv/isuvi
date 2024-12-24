import {useRoutes} from "./routes";
// import {BrowserRouter as Router} from "react-router-dom";
import {HashRouter as Router} from "react-router-dom";
import {Toaster} from "react-hot-toast"
import {useAuthContext} from "./context/AuthContext";
import {useEffect} from "react";
import {Box, CssVarsProvider} from "@mui/joy";
import {Sidebar} from "./components";

function App() {

	const {userData} = useAuthContext()

	const routes = useRoutes(userData)

	// useEffect(() => {
	// 	console.log('userData', userData)
	// }, [userData]);


	return (
		<Box sx={{display: "flex", flexDirection: 'row', width: '100%'}}>
			<Toaster
				position="bottom-right"
				reverseOrder={false}
				toastOptions={{
					duration: 3000
				}}
			/>
			<Router>
				{userData && <Sidebar/>}
				<CssVarsProvider>
					{routes}
				</CssVarsProvider>
			</Router>
		</Box>
	);
}

export default App;
