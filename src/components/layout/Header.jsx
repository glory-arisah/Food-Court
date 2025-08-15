import { Link } from 'react-router-dom'

const Header = () => {
	return (
		<nav className="fixed top-0 px-4 sm:px-8 py-3 bg-white/80 w-full max-h-12 z-[100] shadow">
			<div class="absolute inset-0 bg-gradient-to-r blur-lg to-primary/15 from-primary-blue/15 z-10 "></div>
			<div className="relative flex justify-between items-center gap-x-3">
				<Link
					to="/meals"
					className="flex items-center gap-2 cursor-pointer"
				>
					<h1 className="text-primary font-black text-xl tracking-tighter uppercase">
						FoodBasket
					</h1>
				</Link>
			</div>
		</nav>
	)
}

export default Header
