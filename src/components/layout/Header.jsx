import { Search, ShoppingBasket } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
	const [searchQuery, setSearchQuery] = useState('')

	return (
		<div className="fixed top-0 px-4 sm:px-8 py-3 bg-[#1F1D3F] w-full">
			<nav className="flex justify-between items-center gap-x-3">
				<Link
					to="/meals"
					className="flex items-center gap-4 cursor-pointer"
				>
					<ShoppingBasket
						size={30}
						color="#EA9769"
					/>

					<h1 className="text-white font-semibold text-lg">Food Basket</h1>
				</Link>

				<div className="relative">
					<input
						className="hidden sm:inline outline-none text-sm focus:outline-white text-white placeholder:text-white/50 border border-[#3B5162] p-2.5 pl-8 w-full rounded-3xl"
						value={searchQuery}
						placeholder="Search Recipe..."
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<Search
						className="sm:absolute top-1/2 -translate-y-1/2 left-2"
						color="white"
						size={18}
					/>
				</div>
			</nav>
		</div>
	)
}

export default Header
