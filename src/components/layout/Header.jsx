import { ShoppingBasket } from 'lucide-react'
import { Link } from 'react-router-dom'

const Header = () => {
	return (
		<div className="fixed top-0 px-4 sm:px-8 py-3 bg-[#1F1D3F] w-full z-[100]">
			<nav className="flex justify-between items-center gap-x-3">
				<Link
					to="/meals"
					className="flex items-center gap-4 cursor-pointer"
				>
					<ShoppingBasket
						size={30}
						color="#EA9769"
					/>

					<h1 className="hidden sm:block text-white font-semibold text-lg">
						Food Basket
					</h1>
				</Link>
			</nav>
		</div>
	)
}

export default Header
