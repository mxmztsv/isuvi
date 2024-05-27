import React from "react";
import {Navigate, Route, Routes} from 'react-router-dom'
import {AuthPage, TasksPage} from "./pages";


export const useRoutes = (userData) => {

	// console.log('userData in router', userData)


	if (!userData) {
		return (
			<Routes>
				{/*<Route path="/" element={<AuthPage/>}/>*/}
				<Route path="/tasks" element={<TasksPage/>}/>
				<Route path="*" element={<Navigate to="/tasks" replace/>}/>
			</Routes>
		)
	}

	// if (userData.groupName === "" && !userData.isAdmin) {
	// 	return (
	// 		<Routes>
	// 			<Route path="/" element={<ChooseGroupPage />}/>
	// 			<Route path="*" element={<Navigate to="/" replace />}/>
	// 		</Routes>
	// 	)
	// }
	//
	// if (userData.groupName === "" && userData.isAdmin) {
	// 	return (
	// 		<Routes>
	// 			<Route path="/" element={<CreateGroupPage />}/>
	// 			<Route path="*" element={<Navigate to="/" replace />}/>
	// 		</Routes>
	// 	)
	// }

	return (
		<Routes>
			<Route path="/" element={<AuthPage/>}/>
			<Route path="*" element={<Navigate to="/" replace/>}/>
		</Routes>
	)
}
