import { ChefHat, RotateCcw, Search } from 'lucide-react'

const NoRecipeResult = ({ searchQuery, onClearSearch }) => {
	return (
		<div className="flex flex-col items-center justify-center min-h-96 px-6 py-12 text-center">
			<div className="relative mb-8">
				<div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center relative">
					<div className="relative">
						<Search className="w-12 h-12 text-gray-400" />
						<div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
							<span className="text-lg">❓</span>
						</div>
					</div>
				</div>

				<div
					className="absolute -top-4 -left-4 w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center animate-bounce"
					style={{ animationDelay: '0.5s' }}
				>
					<ChefHat className="w-4 h-4 text-orange-500" />
				</div>
				<div
					className="absolute -bottom-2 -right-6 w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center animate-bounce"
					style={{ animationDelay: '1s' }}
				>
					<span className="text-sm">🍳</span>
				</div>
				<div
					className="absolute top-2 -right-8 w-6 h-6 bg-white rounded-full shadow-sm flex items-center justify-center animate-bounce"
					style={{ animationDelay: '1.5s' }}
				>
					<span className="text-xs">🥄</span>
				</div>
			</div>

			<div className="mb-4 max-w-md">
				<h2 className="text-2xl font-bold text-gray-800">
					No recipes found for "{searchQuery}"
				</h2>
			</div>

			<div className="flex justify-center">
				<button
					onClick={onClearSearch}
					className="inline-flex items-center gap-2 cursor-pointer px-4 py-2 bg-white border border-gray rounded-lg hover:bg-[##f9fafb] transition-colors text-sm font-medium text-gray-700"
				>
					<RotateCcw className="w-4 h-4" />
					Clear search
				</button>
			</div>
		</div>
	)
}

export default NoRecipeResult
