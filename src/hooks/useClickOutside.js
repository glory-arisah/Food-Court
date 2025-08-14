import { useEffect, useRef } from 'react'

const useClickOutside = (callback, options = { excludeElements: [] }) => {
	const { events = ['mousedown', 'touchstart'], excludeElements = [] } = options

	const ref = useRef(null)

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && ref.current.contains(event.target)) {
				return
			}

			for (const excludeRef of excludeElements) {
				if (excludeRef.current && excludeRef.current.contains(event.target)) {
					return
				}
			}

			callback()
		}

		events.forEach((event) => {
			window.addEventListener(event, handleClickOutside)
		})

		return () => {
			events.forEach((event) => {
				window.removeEventListener(event, handleClickOutside)
			})
		}
	}, [])

	return ref
}

export default useClickOutside
