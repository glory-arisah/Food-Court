import axios from 'axios'

const axiosClient = axios.create({
	baseURL: 'themealdb.com',
	headers: {
		'Content-Type': 'application/json',
	},
})

export default axiosClient
