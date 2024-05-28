import React from "react";
import {Navigate, Route, Routes} from 'react-router-dom'
import {AuthPage, CataclysmPage, MachinePage, TasksManagementPage, TasksPage, UsersPage} from "./pages";


export const useRoutes = (userData) => {

	// console.log('userData in router', userData)


	if (!userData) {
		return (
			<Routes>
				<Route path="/auth" element={<AuthPage/>}/>
				<Route path="*" element={<Navigate to="/auth" replace/>}/>
			</Routes>
		)
	}

	if (userData.user.role.id === 1) { // Агент
		return (
			<Routes>
				<Route path="/tasks" element={<TasksPage/>}/>
				<Route path="*" element={<Navigate to="/tasks" replace/>}/>
			</Routes>
		)
	}

	if (userData.user.role.id === 2) { // Вариант
		return (
			<Routes>
				<Route path="/tasks" element={<TasksPage/>}/>
				<Route path="/cataclysms" element={<CataclysmPage/>}/>
				<Route path="*" element={<Navigate to="/cataclysms" replace/>}/>
			</Routes>
		)
	}

	if (userData.user.role.id === 3) { // Менеджер
		return (
			<Routes>
				<Route path="/tasks-management" element={<TasksManagementPage/>}/>
				<Route path="/cataclysms" element={<CataclysmPage/>}/>
				<Route path="*" element={<Navigate to="/tasks-management" replace/>}/>
			</Routes>
		)
	}

	if (userData.user.role.id === 4) { // Помощник
		return (
			<Routes>
				<Route path="/tasks" element={<TasksPage/>}/>
				<Route path="*" element={<Navigate to="/tasks" replace/>}/>
			</Routes>
		)
	}

	if (userData.user.role.id === 5) { // Управляющий станком
		return (
			<Routes>
				<Route path="/machine" element={<MachinePage/>}/>
				<Route path="*" element={<Navigate to="/machine" replace/>}/>
			</Routes>
		)
	}

	if (userData.user.role.id === 6) { // Администратор
		return (
			<Routes>
				<Route path="/tasks-management" element={<TasksManagementPage/>}/>
				<Route path="/cataclysms" element={<CataclysmPage/>}/>
				<Route path="/users" element={<UsersPage/>}/>
				<Route path="/machine" element={<MachinePage/>}/>
				<Route path="*" element={<Navigate to="/users" replace/>}/>
			</Routes>
		)
	}

	if (userData.user.role.id === 7) { // Dev
		return (
			<Routes>
				<Route path="/tasks-management" element={<TasksManagementPage/>}/>
				<Route path="/tasks" element={<TasksPage/>}/>
				<Route path="/cataclysms" element={<CataclysmPage/>}/>
				<Route path="/users" element={<UsersPage/>}/>
				<Route path="/machine" element={<MachinePage/>}/>
				<Route path="*" element={<Navigate to="/users" replace/>}/>
			</Routes>
		)
	}

	return (
		<Routes>
			<Route path="/auth" element={<AuthPage/>}/>
			<Route path="*" element={<Navigate to="/auth" replace/>}/>
		</Routes>
	)
}
