import './Loader.css'

export default function Loader() {
	return (
		<div
			className="loading-dots"
			aria-label="Loading"
			role="status"
		>
			<span />
			<span />
			<span />
		</div>
	)
}
