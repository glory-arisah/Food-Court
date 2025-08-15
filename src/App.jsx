import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import Header from '@components/layout/Header'
import Footer from '@components/layout/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ScrollToTop from '@components/ScrollToTop'

function App() {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<div className="min-h-screen flex flex-col">
				<Header />
				<main className="flex flex-1 mt-12">
					<AppRoutes />
				</main>
				<Footer />
				<ToastContainer />
			</div>
		</BrowserRouter>
	)
}

export default App
