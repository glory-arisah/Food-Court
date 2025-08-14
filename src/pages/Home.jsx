import { Check, ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import '../assets/Home.css'
import { fetchCategories, fetchMealsByCategory } from '../api/mealsApi'
import MealCard from '../components/MealCard'
import Loader from '../components/Loader/Loader'
import { toast } from 'react-toastify'
import Modal from '../components/Modal'
import useClickOutside from '../hooks/useClickOutside'

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
		if (isModalOpen) setTempSortOrder(sortOrder)
	}, [isModalOpen])

	function applySortOrder() {
		setSortOrder(tempSortOrder)
		setIsModalOpen(false)
	}

	// FILTER MEALS BY SEARCH QUERY
	const filteredMeals = useMemo(() => {
		return meals.filter((meal) =>
			meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
		)
	}, [searchQuery, meals])

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
		<div className="h-full w-full">
			<section className="header--wrapper relative flex justify-center items-center min-h-[250px] sm:min-h-[300px]">
				<div className="z-10 flex flex-col gap-y-8 w-full max-w-2xl mx-auto px-4">
					<h2 className="text-white text-center text-xl font-semibold">
						Find Recipes
					</h2>

					<div className="relative">
						<Search
							className="absolute top-1/2 -translate-y-1/2 left-5"
							color="#787878"
							size={20}
						/>

						<input
							className="outline-none text-sm bg-white text-[#232323] placeholder:text-[#232323]/50 border border-[#3B5162] py-4 sm:py-6 px-12 w-full rounded-xl"
							value={searchQuery}
							placeholder="Search Recipe..."
							onChange={(e) => setSearchQuery(e.target.value)}
						/>

						<button
							type="button"
							onClick={() => setSearchQuery('')}
							className={`absolute right-6 origin-bottom-right p-1 transition-colors top-1/2 -translate-y-1/2 transition-opacity duration-200 hover:bg-[#f1f1f1] rounded-full cursor-pointer ${
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
				</div>
			</section>
			<section className="bg-white py-8 px-6">
				<div className="categories text-[#232323] relative flex gap-x-8 mb-8 whitespace-nowrap overflow-x-auto overflow-y-hidden font-semibold text-sm border-b-[0.5px] pb-2 border-[#ABBBC2] scrollbar">
					{categories.map((category, index) => (
						<button
							key={index}
							type="button"
							onClick={() => handleSelectCategory(category)}
							className={`${
								isActiveCategory(category?.idCategory)
									? 'text-[#EA7C69] after:absolute after:content-[""] after:left-0 after:-bottom-2.5 after:border-3 after:border-[#EA7C69] after:rounded-full after:w-full '
									: ''
							}	cursor-pointer relative transition-colors duration-300 hover:text-[#EA7C69]`}
						>
							<span>{category?.strCategory ?? 'N/A'}</span>
						</button>
					))}
				</div>

				{isFetchingMeals ? (
					<div className="flex w-full justify-center items-center py-20">
						<Loader />
					</div>
				) : (
					<>
						<div className="flex justify-between items-center text-[#232323] font-semibold mb-8">
							<h4>
								Found{' '}
								<span className="text-[#4094F7]">
									{filteredMeals.length}{' '}
									{filteredMeals.length === 1 ? 'result' : 'results'}
								</span>
							</h4>

							<button
								type="button"
								onClick={() => setIsModalOpen(true)}
								className="inline sm:hidden p-1 cursor-pointer border border-[#232323] rounded-lg"
							>
								<SlidersHorizontal size={16} />
							</button>

							<div
								ref={dropdownTriggerRef}
								role="button"
								onClick={toggleSortDropdown}
								className="hidden sm:flex items-center relative p-1 pl-3 border border-[#DDE2E4] rounded-md text-sm cursor-pointer"
							>
								<span className="inline-block mr-2 text-[#787878]">
									Sort by
								</span>
								<span className="inline-block mr-1">
									Name{sortOrder && <span>: {sortOrder}</span>}
								</span>
								<div className="p-2">
									<ChevronDown size={14} />
								</div>

								<div
									ref={dropdownRef}
									className={`absolute right-0 top-full translate-y-1 z-10 min-w-[160px] space-y-1.5 p-1.5 pt-3 rounded-lg bg-white text-left shadow-md transition-opacity duration-200 ${
										showSortDropdown
											? 'visible opacity-100'
											: 'invisible opacity-0'
									}`}
								>
									{sortOrders.map((order) => (
										<div
											key={order.key}
											className={`flex items-center justify-between hover:bg-[#FF7F11]/30 ${
												sortOrder === order.key ? 'bg-[#FF7F11]/30' : ''
											}`}
										>
											<button
												type="button"
												onClick={() => setSortOrder(order.key)}
												className={`text-left w-full p-1  cursor-pointer										
									`}
											>
												{order.label}
											</button>

											{sortOrder === order.key && (
												<Check
													size={18}
													color="#FF7F11"
												/>
											)}
										</div>
									))}
								</div>
							</div>
						</div>

						<Modal
							isOpen={isModalOpen}
							onClose={() => setIsModalOpen(false)}
						>
							<div className="flex-1">
								<div className="flex justify-between items-center pb-2 border-b border-gray-200">
									<h3 className="text-lg font-semibold">Sort by Name</h3>
									<button
										onClick={() => setIsModalOpen(false)}
										className="hover:bg-[#f1f1f1] rounded-full p-1"
									>
										<X
											size={20}
											className="text-gray-500 hover:text-gray-700"
										/>
									</button>
								</div>
								<div className="pt-4 space-y-2 text-[#232323] text-sm">
									{sortOrders.map((order) => (
										<div
											key={order.key}
											className={`flex items-center justify-between rounded px-2 hover:bg-[#FF7F11]/30`}
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
										className="w-full px-4 py-2.5 text-white cursor-pointer font-bold rounded-xl bg-[#FF7F11] hover:bg-[#FF7F11]/80 transition-colors duration-200"
									>
										Apply
									</button>
								</div>
							</div>
						</Modal>

						<div className="meals-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 text-[#232323]">
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
			</section>
		</div>
	)
}
export default Home
