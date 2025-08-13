import { Routes, Route, Navigate } from 'react-router-dom'
import MealView from '../pages/MealView'
import Home from '../pages/Home'

export default function AppRoutes() {
	return (
		<Routes>
			<Route
				path="/"
				element={<Navigate to="/meals" />}
			/>
			<Route
				path="/meals"
				element={<Home />}
			/>
			<Route
				path="/meals/:id"
				element={<MealView />}
			/>
			<Route
				path="*"
				element={<Navigate to="/meals" />}
			/>
		</Routes>
	)
}
