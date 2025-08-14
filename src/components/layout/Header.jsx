import { ShoppingBasket } from 'lucide-react'
import { Link } from 'react-router-dom'

const Header = () => {
	return (
		<div className="fixed top-0 px-4 sm:px-8 py-3 bg-primary/80 w-full max-h-12 z-[100]">
			<nav className="flex justify-between items-center gap-x-3">
				<Link
					to="/meals"
					className="flex items-center gap-4 cursor-pointer"
				>
					<ShoppingBasket
						size={30}
						color="#FFFFFF"
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
