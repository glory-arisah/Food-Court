import axiosClient from './axiosClient'

export const fetchCategories = () => axiosClient.get('/categories.php ')

export const fetchMealsInCategory = (categoryName) =>
	axiosClient.get(`/filter.php?c=${categoryName}`)

export const fetchMealDetails = (mealId) =>
	axiosClient.get(`/lookup.php?i=${mealId}`)
