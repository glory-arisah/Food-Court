import { Facebook, Instagram, Twitter } from 'lucide-react'

const Footer = () => {
	const currentDate = new Date()

	return (
		<section>
			<div className="px-4 sm:px-8 py-4 bg-[#1F1D3F] w-full">
				<div className="flex justify-between">
					<div className="socail-media--links flex gap-2">
						<Facebook
							color="white"
							size={18}
						/>
						<Twitter
							color="white"
							size={18}
						/>
						<Instagram
							color="white"
							size={18}
						/>
					</div>

					<div>
						<div className="flex items-center gap-2 text-sm">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								aria-hidden="true"
								role="img"
								width="1em"
								height="1em"
								viewBox="0 0 24 24"
							>
								<path
									fill="currentColor"
									d="M10 16h4q.425 0 .713-.288T15 15v-2h-2v1h-2v-4h2v1h2V9q0-.425-.288-.712T14 8h-4q-.425 0-.712.288T9 9v6q0 .425.288.713T10 16m2 6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
								></path>
							</svg>
							{currentDate.getFullYear()} Food Basket
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Footer
