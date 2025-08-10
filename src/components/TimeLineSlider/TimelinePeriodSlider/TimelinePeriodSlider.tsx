import { useEffect, useRef, useState } from 'react'

import gsap from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
gsap.registerPlugin(MotionPathPlugin)

import { BREAKPOINT, RADIUS } from '@/consts'
import { CircularSliderProps } from '@/types'

import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

export function TimelinePeriodSlider({ slides, onChangeActiveIndex }: CircularSliderProps) {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const slideRefs = useRef<(HTMLDivElement | null)[]>([])
	const textRefs = useRef<(HTMLSpanElement | null)[]>([])
	const [isMobile, setIsMobile] = useState(window.innerWidth < BREAKPOINT)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [showLabelIndex, setShowLabelIndex] = useState<number | null>(null)

	useEffect(() => {
		animateToIndex(0)
	}, [])

	useEffect(() => {
		const onResize = () => {
			setIsMobile(window.innerWidth < BREAKPOINT)
			setCurrentIndex(0)
		}
		window.addEventListener('resize', onResize)
		return () => window.removeEventListener('resize', onResize)
	}, [])

	useEffect(() => {
		if (isMobile) {
			slideRefs.current.forEach((slide) => {
				if (slide) gsap.set(slide, { clearProps: 'all' })
			})
			textRefs.current.forEach((text) => {
				if (text) gsap.set(text, { opacity: 1 })
			})
			return
		}

		slideRefs.current.forEach((slide, i) => {
			if (!slide) return
			const angle = (360 / slides.length) * i
			const angleInRad = ((angle - 60) * Math.PI) / 180

			gsap.set(slide, {
				position: 'absolute',
				left: '50%',
				top: '50%',
				xPercent: -50,
				yPercent: -50,
				x: Math.cos(angleInRad) * RADIUS,
				y: Math.sin(angleInRad) * RADIUS,
				rotation: 0,
			})
		})
	}, [isMobile, slides])

	const animateToIndex = (newIndex: number) => {
		if (isMobile) {
			if (!containerRef.current) return
			gsap.to(containerRef.current, {
				x: -newIndex * (containerRef.current.clientWidth || 0),
				duration: 0.5,
			})
			setCurrentIndex(newIndex)
			return
		}

		const totalSlides = slides.length
		const angleStep = 360 / totalSlides
		const offsetAngle = 60 // смещение для активного слайда

		// Вычисляем минимальное смещение по кругу с учетом направления
		const diff = (newIndex - currentIndex + totalSlides) % totalSlides

		//движение по часовой, если diff больше половины круга (слева), иначе против часовой (справа)
		const clockwise = diff >= totalSlides / 2

		function getArcPath(
			startX: number,
			startY: number,
			endX: number,
			endY: number,
			radius: number,
			clockwise: boolean,
		) {
			const startAngle = Math.atan2(startY, startX)
			const endAngle = Math.atan2(endY, endX)

			const steps = 20
			const path = []

			let angleDiff = endAngle - startAngle
			if (clockwise && angleDiff < 0) angleDiff += 2 * Math.PI
			if (!clockwise && angleDiff > 0) angleDiff -= 2 * Math.PI

			for (let i = 0; i <= steps; i++) {
				const angle = startAngle + (angleDiff * i) / steps
				path.push({
					x: radius * Math.cos(angle),
					y: radius * Math.sin(angle),
				})
			}
			return path
		}

		slideRefs.current.forEach((slide, i) => {
			if (!slide) return

			const gsapTransform = gsap.getProperty(slide)
			const currentX = Number(gsapTransform('x')) || 0
			const currentY = Number(gsapTransform('y')) || 0

			const relativeIndex = (i - newIndex + totalSlides) % totalSlides
			const targetAngle = relativeIndex * angleStep - offsetAngle
			const angleInRad = (targetAngle * Math.PI) / 180
			const x = RADIUS * Math.cos(angleInRad)
			const y = RADIUS * Math.sin(angleInRad)

			const path = getArcPath(currentX, currentY, x, y, RADIUS, clockwise)

			gsap.to(slide, {
				duration: 0.6,
				ease: 'power2.inOut',
				motionPath: {
					path,
					autoRotate: false,
				},
				onComplete: () => {
					if (i === newIndex) {
						setShowLabelIndex(newIndex)
					}
				},
			})
		})

		setShowLabelIndex(null)

		setCurrentIndex(newIndex)
		if (onChangeActiveIndex) onChangeActiveIndex(newIndex)
	}

	const handlePrev = () => {
		if (currentIndex === 0) return
		const newIndex = (currentIndex - 1 + slides.length) % slides.length
		animateToIndex(newIndex)
	}

	const handleNext = () => {
		if (currentIndex === slides.length - 1) return
		const newIndex = (currentIndex + 1) % slides.length
		animateToIndex(newIndex)
	}

	return (
		<div className="timeline-period-slider">
			<div
				className={`timeline-period-slider__container ${isMobile ? 'is-mobile' : 'is-desktop'}`}
			>
				<div
					className={`timeline-period-slider__content`}
					ref={containerRef}
					style={{
						position: 'relative',
						width: '100%',
						height: '100%',
						overflow: 'visible',
					}}
				>
					{slides.map((slide, i) => (
						<div
							key={slide.id}
							ref={(el) => {
								slideRefs.current[i] = el
							}}
						>
							<button
								className={`timeline-period-slider__slide ${i === currentIndex ? 'is-active' : ''} ${
									i === showLabelIndex ? 'show-label' : ''
								}`}
								onClick={() => animateToIndex(i)}
								data-label={slide.label}
							>
								<span className="timeline-period-slider__slide-text">
									{slide.id}
								</span>
								<span
									className="timeline-period-slider__slide-circle"
									aria-hidden="true"
								></span>
							</button>
						</div>
					))}
				</div>
			</div>

			<div className="timeline-period-slider__nav" style={{ marginTop: 20 }}>
				<span className="timeline-period-slider__counter">
					{String(currentIndex + 1).padStart(2, '0')}/
					{String(slides.length).padStart(2, '0')}
				</span>

				<div className="timeline-period-slider__nav-btns" style={{ marginTop: 20 }}>
					<button
						onClick={handlePrev}
						disabled={currentIndex === 0}
						className="timeline-period-slider__nav-btn timeline-period-slider__nav-btn--prev"
					>
						Prev
					</button>
					<button
						onClick={handleNext}
						disabled={currentIndex === slides.length - 1}
						className="timeline-period-slider__nav-btn timeline-period-slider__nav-btn--next"
					>
						Next
					</button>
				</div>
			</div>

			{isMobile && (
				<div className="timeline-period-slider__pagination" style={{ marginTop: 10 }}>
					{slides.map((_, i) => (
						<span
							key={i}
							className={`timeline-period-slider__bullet ${i === currentIndex ? 'is-active' : ''}`}
							style={{
								display: 'inline-block',
								width: 10,
								height: 10,
								borderRadius: '50%',
								backgroundColor: i === currentIndex ? '#333' : '#999',
								marginRight: 5,
							}}
						/>
					))}
				</div>
			)}
		</div>
	)
}
