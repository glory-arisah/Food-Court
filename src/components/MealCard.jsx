import { Image } from 'lucide-react'
import { Link } from 'react-router-dom'

const MealCard = ({ meal }) => {
	const mealRoute = meal.idMeal ? `/meals/${meal?.idMeal}` : '/'

	return (
		<Link
			to={mealRoute}
			className="flex flex-row sm:flex-col items-center rounded overflow-hidden border border-[#E5E9EB]"
		>
			<div className="group flex-1 sm:flex-[0.7] w-full overflow-clip">
				<div className="h-full w-full flex justify-center items-center transform group-hover:scale-110 transition duration-200">
					{meal.strMealThumb ? (
						<img
							src={meal?.strMealThumb}
							alt={meal?.strMeal}
							className="w-full"
						/>
					) : (
						<Image size={40} />
					)}
				</div>
			</div>

			<div className="flex-1 sm:flex-[0.3] w-full p-6 space-y-1 truncate">
				<h4 className="text-lg font-semibold truncate">{meal?.strMeal}</h4>
			</div>
		</Link>
	)
}

export default MealCard
