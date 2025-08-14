import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

const Modal = ({ isOpen, onClose, children }) => {
	const [isVisible, setIsVisible] = useState(false)
	const [isAnimating, setIsAnimating] = useState(false)

	useEffect(() => {
		if (isOpen) {
			setIsVisible(true)
			setTimeout(() => setIsAnimating(true), 10)
		} else {
			setIsAnimating(false)
			const timer = setTimeout(() => setIsVisible(false), 300)
			return () => clearTimeout(timer)
		}
	}, [isOpen])

	if (!isVisible) return null

	return (
		<>
			<div
				className={`
         fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ease-out
          ${isAnimating ? 'bg-opacity-[0.4]' : 'bg-opacity-0'}
        `}
				onClick={onClose}
			/>

			<div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
				<div
					className={`
            w-full  bg-white rounded-t-3xl shadow-lg pointer-events-auto
            transform transition-all duration-300 ease-out
            ${
							isAnimating
								? 'translate-y-0 opacity-100'
								: 'translate-y-full opacity-0'
						}
          `}
				>
					<div className="flex p-4 h-full overflow-y-auto">{children}</div>
				</div>
			</div>
		</>
	)
}

export default Modal
