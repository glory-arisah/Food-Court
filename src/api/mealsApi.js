import axiosClient from './axiosClient'

const handleApiError = (error) => {
	if (error.response) {
		throw new Error(
			error.response.data.message || 'Server responded with an error.'
		)
	} else if (error.request) {
		throw new Error(
			'No response from the server. Please check your network connection.'
		)
	} else {
		throw new Error('Something went wrong during the request.')
	}
}

export const fetchCategories = async () => {
	try {
		const response = await axiosClient.get('/categories.php ')
		return response.data
	} catch (error) {
		handleApiError(error)
	}
}

export const fetchMealsByCategory = async (categoryName) => {
	try {
		const response = await axiosClient.get(`/filter.php?c=${categoryName}`)
		return response.data
	} catch (error) {
		handleApiError(error)
	}
}

export const fetchMealDetails = async (mealId) => {
	try {
		const response = await axiosClient.get(`/lookup.php?i=${mealId}`)
		return response.data
	} catch (error) {
		handleApiError(error)
	}
}
