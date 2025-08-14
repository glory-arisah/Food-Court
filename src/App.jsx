import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

function App() {
	return (
		<BrowserRouter>
			<div className="bg-[#0a0a0a] text-white min-h-screen flex flex-col">
				<Header />
				<main className="flex-1 mt-10">
					<AppRoutes />
				</main>
				<Footer />
			</div>
		</BrowserRouter>
	)
}

export default App
