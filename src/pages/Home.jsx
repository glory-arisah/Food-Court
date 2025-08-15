import { Check, ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import '@/assets/Home.css'
import { fetchCategories, fetchMealsByCategory } from '@/api/mealsApi'
import MealCard from '@components/MealCard'
import Loader from '@components/Loader/Loader'
import { toast } from 'react-toastify'
import Modal from '@components/Modal'
import useClickOutside from '@/hooks/useClickOutside'
import NoRecipeResult from '../components/NoRecipeResult'

const sortOrders = [
	{ key: 'ASC', label: 'Name (A-Z)' },
	{ key: 'DESC', label: 'Name: (Z-A)' },
]

const Home = () => {
	const [isFetchingMeals, setIsFetchingMeals] = useState(false)
	const [categories, setCategories] = useState([])

	const [isFetchingCategories, setIsFetchingCategories] = useState(false)
	const [selectedCategory, setSelectedCategory] = useState(null)
	const [searchQuery, setSearchQuery] = useState('')
	const [meals, setMeals] = useState([])

	// SORT MEALS - START
	const [tempSortOrder, setTempSortOrder] = useState(null)
	const [sortOrder, setSortOrder] = useState(null)
	const [showSortDropdown, setShowSortDropdown] = useState(false)
	const dropdownTriggerRef = useRef(null)
	const dropdownRef = useClickOutside(() => setShowSortDropdown(false), {
		excludeElements: [dropdownTriggerRef],
	})

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

	function toggleSortDropdown() {
		setShowSortDropdown((prev) => !prev)
	}

	function sortMeals(sortType = sortOrder) {
		if (sortType === null) return null

		setMeals((prev) =>
			[...prev].sort((a, b) => {
				const comparison = a.strMeal.localeCompare(b.strMeal)
				return sortType === 'ASC' ? comparison : -comparison
			})
		)
	}

	useEffect(() => {
		sortMeals(sortOrder)
	}, [sortOrder])

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 640)
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	useEffect(() => {
		if (!isMobile && isModalOpen) {
			setIsModalOpen(false)
		}

		if (isMobile && showSortDropdown) {
			setShowSortDropdown(false)
		}
	}, [isMobile])

	useEffect(() => {
		if (isModalOpen) {
			setTempSortOrder(sortOrder)
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
	}, [isModalOpen])

	function applySortOrder() {
		setSortOrder(tempSortOrder)
		setIsModalOpen(false)
	}

	// FILTER MEALS BY SEARCH QUERY
	const filteredMeals = useMemo(
		() =>
			meals.filter((meal) =>
				meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
			),
		[searchQuery, meals]
	)

	const showNoResults = useMemo(
		() =>
			searchQuery.trim().length > 0 &&
			meals.length > 0 &&
			filteredMeals.length === 0,
		[filteredMeals, searchQuery]
	)

	// FETCH MEALS BY CATEGORY
	useEffect(() => {
		async function handleFetchCategories() {
			setIsFetchingCategories(true)

			try {
				const response = await fetchCategories()
				const nextCategories = response?.categories ?? []
				setCategories(nextCategories)
				handleSelectCategory(nextCategories[0])
			} catch (error) {
				toast.error(error?.message ?? 'Error retrieving meal categories.')
			} finally {
				setIsFetchingCategories(false)
			}
		}

		handleFetchCategories()
	}, [])

	function isActiveCategory(categoryId) {
		return selectedCategory?.idCategory === categoryId
	}

	async function handleSelectCategory(category) {
		const prevCategory = { ...selectedCategory }
		setSelectedCategory(category)
		setIsFetchingMeals(true)

		try {
			const response = await fetchMealsByCategory(category?.strCategory)
			setMeals(response?.meals ?? [])
			sortMeals()
		} catch (error) {
			setSelectedCategory(prevCategory)
			toast.error(error?.message ?? "Couldn't retrieve recipe data.")
		} finally {
			window.scrollTo({ top: 0, behavior: 'instant' })
			setIsFetchingMeals(false)
		}
	}

	if (isFetchingCategories) {
		return (
			<div className="flex-1 flex justify-center items-center">
				<Loader className="relative top-1/2 -translate-y-1/2" />
			</div>
		)
	}

	return (
		<div className="flex-1 flex flex-col w-full">
			<section className="relative flex justify-center items-center">
				<div className="z-10 flex flex-col gap-y-8 w-full max-w-2xl mx-auto px-4"></div>
			</section>
			<section className="flex-1 flex flex-col py-8 px-6">
				<div className="categories  text-primary-dark relative flex gap-x-2 mb-6 whitespace-nowrap overflow-x-auto overflow-y-hidden font-semibold text-sm sm:border-b-[0.5px] sm:border-[#ABBBC2]  pb-2 scrollbar">
					{categories.map((category, index) => (
						<button
							key={index}
							type="button"
							onClick={() => handleSelectCategory(category)}
							className={`${
								isActiveCategory(category?.idCategory)
									? 'sm:-0 text-white sm:text-primary bg-primary sm:bg-transparent sm:after:absolute sm:after:content-[""] sm:after:left-0 sm:after:-bottom-2.5 sm:after:border-3 after:border-primary after:rounded-full after:w-full '
									: ''
							} py-1.5 px-2.5 rounded-full cursor-pointer relative transition-colors duration-300 sm:hover:text-primary`}
						>
							<span>{category?.strCategory ?? 'N/A'}</span>
						</button>
					))}
				</div>

				<div className="flex justify-end gap-3 text-primary-dark font-semibold mb-6">
					<div className="flex-grow sm:flex-grow-0 relative">
						<Search
							className="absolute top-1/2 -translate-y-1/2 left-5"
							color="#787878"
							size={20}
						/>

						<input
							className="text-sm bg-white text-primary-dark placeholder:text-primary-dark/50 border border-primary-dark/30 outline-none focus:outline-2 focus:outline-primary focus:border-primary-dark transition-colors duration-200 py-2 sm:py-3  px-12 w-full rounded-lg"
							value={searchQuery}
							placeholder="Search Recipe..."
							onChange={(e) => setSearchQuery(e.target.value)}
						/>

						<button
							type="button"
							onClick={() => setSearchQuery('')}
							className={`absolute right-6 origin-bottom-right p-1 transition-colors top-1/2 -translate-y-1/2 transition-opacity duration-200 hover:bg-gray rounded-full cursor-pointer ${
								searchQuery.trim().length > 0
									? 'visible opacity-100'
									: 'invisible opacity-0'
							}`}
						>
							<X
								color="#787878"
								size={18}
							/>
						</button>
					</div>

					<button
						type="button"
						disabled={showNoResults}
						onClick={() => setIsModalOpen(true)}
						className="inline sm:hidden py-1 px-2 cursor-pointer border border-primary-dark/30 rounded-lg disabled:cursor-not-allowed disabled:opacity-70"
					>
						<SlidersHorizontal
							size={16}
							className="text-primary-dark/30 stroke-current"
						/>
					</button>

					<button
						type="button"
						ref={dropdownTriggerRef}
						disabled={showNoResults}
						onClick={toggleSortDropdown}
						className="hidden sm:flex items-center relative p-1 pl-3 shadow rounded-md text-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
					>
						<span className="inline-block mr-2 text-[#787878]">Sort by</span>
						<span className="inline-block mr-1">
							Name{sortOrder && <span>: {sortOrder}</span>}
						</span>
						<div className="p-2">
							<ChevronDown size={16} />
						</div>

						<div
							ref={dropdownRef}
							className={`absolute right-0 top-full translate-y-1 z-10 min-w-[160px] space-y-1.5 p-1.5 pt-3 rounded-lg bg-white text-left shadow-md transition-opacity duration-200 ${
								showSortDropdown ? 'visible opacity-100' : 'invisible opacity-0'
							}`}
						>
							{sortOrders.map((order) => (
								<div
									key={order.key}
									className={`flex items-center justify-between px-1 hover:bg-primary/30 rounded-md ${
										sortOrder === order.key ? 'bg-primary/30' : ''
									}`}
								>
									<span
										onClick={() => setSortOrder(order.key)}
										className={`text-left w-full p-1 cursor-pointer										
							`}
									>
										{order.label}
									</span>

									{sortOrder === order.key && (
										<Check
											size={18}
											color="#d45a3c"
										/>
									)}
								</div>
							))}
						</div>
					</button>
				</div>

				{isFetchingMeals ? (
					<div className="flex-1 flex w-full justify-center items-center">
						<Loader />
					</div>
				) : showNoResults ? (
					<NoRecipeResult
						searchQuery={searchQuery}
						onClearSearch={() => setSearchQuery('')}
					/>
				) : (
					<>
						<div className="mb-6">
							<h4 className="font-semibold text-primary-dark">
								Found{' '}
								<span className="text-primary">
									{filteredMeals.length}{' '}
									{filteredMeals.length === 1 ? 'result' : 'results'}
								</span>
							</h4>
						</div>

						<div className="meals-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 text-primary-dark">
							{filteredMeals.map((meal, mealIdx) => (
								<MealCard
									key={meal.idMeal || mealIdx}
									category={selectedCategory}
									meal={meal}
								/>
							))}
						</div>
					</>
				)}
				<Modal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
				>
					<div className="flex-1">
						<div className="flex justify-between items-center pb-2 border-b border-gray-200">
							<h3 className="text-lg font-semibold">Sort by Name</h3>
							<button
								onClick={() => setIsModalOpen(false)}
								className="hover:bg-gray rounded-full p-1"
							>
								<X
									size={20}
									className="text-gray-500 hover:text-gray-700"
								/>
							</button>
						</div>
						<div className="pt-4 space-y-2 text-primary-dark text-sm">
							{sortOrders.map((order) => (
								<div
									key={order.key}
									className={`flex items-center justify-between rounded px-2 hover:bg-primary/30`}
								>
									<button
										type="button"
										onClick={() => setTempSortOrder(order.key)}
										className={`text-left flex-1 p-1 cursor-pointer										
									`}
									>
										{order.label}
									</button>

									{tempSortOrder === order.key && (
										<Check
											size={18}
											color="#FF7F11"
										/>
									)}
								</div>
							))}
						</div>
						<div className="pt-4">
							<button
								onClick={applySortOrder}
								className="w-full px-4 py-2.5 text-white cursor-pointer font-bold rounded-xl bg-primary hover:bg-primary/80 transition-colors duration-200"
							>
								Apply
							</button>
						</div>
					</div>
				</Modal>
			</section>
		</div>
	)
}
export default Home
