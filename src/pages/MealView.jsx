import {
	ArrowLeft,
	ChevronLeft,
	Image,
	MapPin,
	ShoppingBag,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchMealDetails } from '../api/mealsApi'

function TextWithLineBreaks({ text }) {
	const htmlString = text
		.replace(/\r\n/g, '<br />')
		.replace(/\n/g, '<br />')
		.replace(/\r/g, '<br />')

	return (
		<div
			className="leading-8 text-sm"
			dangerouslySetInnerHTML={{ __html: htmlString }}
		/>
	)
}

const MealView = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [meal, setMeal] = useState(null)
	const videoFrame = useRef(null)

	const ingredients = useMemo(
		() => (meal === null ? [] : formatIngredients(meal)),
		[meal]
	)

	useEffect(() => {
		async function handleFetchMealDetails() {
			const response = await fetchMealDetails(id)

			const fetchedMeal = response?.meals?.[0] ?? null
			setMeal(fetchedMeal)
			formatIngredients(fetchedMeal)
			formatVideoUrl(fetchedMeal)
		}

		handleFetchMealDetails()
	}, [id])

	function formatVideoUrl(meal) {
		const videoUrl = meal?.strYoutube
		if (videoFrame.current === null || !videoUrl) return

		const videoId = new URL(videoUrl).searchParams.get('v')
		const embedUrl = `https://www.youtube.com/embed/${videoId}`

		videoFrame.current.src = embedUrl
	}

	function formatIngredients(meal) {
		if (!meal) return []
		const ingredientsArray = []

		Object.keys(meal).forEach((key) => {
			if (key.startsWith('strIngredient') && meal[key]?.trim()) {
				const index = key.replace('strIngredient', '')
				const measure = meal[`strMeasure${index}`]?.trim() || null

				ingredientsArray.push({
					ingredient: meal[key].trim(),
					measure,
				})
			}
		})

		return ingredientsArray
	}

	if (!meal) return <div></div>

	return (
		<div className="text-[#232323] px-6 sm:px-12 pt-6 pb-4">
			<header className="pl-1 mb-4">
				<button
					onClick={() => navigate('/meals')}
					type="button"
					className="group text-[#232323] cursor-pointer "
				>
					<div className="flex sm:hidden hover:bg-[#F1F1F1] rounded-full p-1">
						<ChevronLeft size={20} />
					</div>
					<div className="hidden sm:flex items-center gap-1">
						<ArrowLeft
							size={16}
							className="transition-transform transform group-hover:-translate-x-1"
						/>
						<span className="font-medium">Go back</span>
					</div>
				</button>
			</header>

			<h4 className="font-bold text-2xl sm:text-[40px] text-center mb-4">
				<span>{meal?.strMeal}</span>
			</h4>

			<div className="flex items-center justify-center mb-6 text-xs font-semibold gap-4">
				<p className="flex items-center gap-2">
					<MapPin size={16} /> {meal?.strArea}
				</p>
				<span>
					<svg
						width="4"
						height="4"
						viewBox="0 0 4 4"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle
							cx="2"
							cy="2"
							r="2"
							fill="#262522"
						/>
					</svg>
				</span>
				<p className="flex items-center gap-2">
					<ShoppingBag size={16} /> {meal?.strCategory}
				</p>
			</div>

			<section>
				<div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row-dense gap-y-8 sm:gap-x-14 sm:gap-y-10">
					<div className="space-y-2">
						<div className="flex sm:block justify-center items-center max-h-[300px] sm:max-h-none sm:h-full sm:w-full overflow-hidden rounded-xl">
							{meal?.strMealThumb ? (
								<img
									src={meal.strMealThumb}
									className="object-center w-full rounded-xl"
								/>
							) : (
								<div className="flex justify-center items-center w-full h-full border border-[#262522] p-3 rounded-xl">
									<Image size={40} />
								</div>
							)}
						</div>
					</div>
					<div className="ingredients mt-0 py-6 px-4 bg-[#FFFBF2] border border-[#262522]/24 rounded-lg shadow-md">
						<h5 className="mb-4">
							<div>
								<span className="font-semibold text-lg sm:text-xl uppercase text-[#EE6352]">
									Ingredients
								</span>{' '}
								<span className="text-sm text-[#A9A9A9]">
									({ingredients.length}{' '}
									{ingredients.length === 1 ? 'item' : 'items'})
								</span>
							</div>
						</h5>

						<div className="space-y-2 rounded-xl">
							{ingredients.map((item, index) => (
								<div
									key={item?.ingredient ?? index}
									className="space-x-1"
								>
									<span>{item?.measure}</span>
									<span className="font-bold">{item?.ingredient}</span>
								</div>
							))}
						</div>
					</div>

					<div className="sm:col-span-2">
						<h4 className="mb-2 font-semibold text-lg sm:text-3xl uppercase text-[#333333]">
							Instructions
						</h4>
						<div className="w-full sm:w-1/2">
							<TextWithLineBreaks text={meal.strInstructions} />
						</div>
					</div>

					{meal?.strYoutube && (
						<div>
							<h4 className="mb-2 font-semibold text-lg uppercase text-[#333333]">
								Watch Tutorial
							</h4>
							<div className="relative max-w-full h-[250px] sm:w-full overflow-hidden">
								<iframe
									ref={videoFrame}
									className="absolute top-0 left-0 w-full h-full"
									id="videoFrame"
									title="YouTube video player"
									frameborder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									allowfullscreen
								></iframe>
							</div>
						</div>
					)}
				</div>
			</section>
		</div>
	)
}

export default MealView
