import { Swiper, SwiperSlide } from 'swiper/react'

import { Navigation, A11y } from 'swiper/modules'

import { data } from '@/store'

type Props = {
	isDesktop: boolean
	activeIndex: number
}

export const EventSlider = ({ isDesktop, activeIndex }: Props) => {
	return (
		<div className={'timeline-event-slider-wrapper'}>
			{isDesktop && (
				<button
					className={
						'timeline-event-slider__nav-btn timeline-event-slider__nav-btn--prev'
					}
				>
					Prev
				</button>
			)}

			<Swiper
				className={'timeline-event-slider'}
				modules={[Navigation, A11y]}
				slidesPerView={'auto'}
				spaceBetween={25}
				grabCursor
				navigation={
					isDesktop
						? {
								prevEl: '.timeline-event-slider__nav-btn--prev',
								nextEl: '.timeline-event-slider__nav-btn--next',
							}
						: false
				}
				breakpoints={{
					1280: {
						spaceBetween: 40,
					},
					1440: {
						spaceBetween: 80,
					},
				}}
			>
				{data[activeIndex].events.map((event) => (
					<SwiperSlide key={event.id} className={'timeline-event-slider__slide'}>
						<div className={'timeline-event-slider__slide-title'}>{event.year}</div>
						<div className={'timeline-event-slider__slide-desc'}>{event.short}</div>
					</SwiperSlide>
				))}
			</Swiper>
			{isDesktop && (
				<button
					className={
						'timeline-event-slider__nav-btn timeline-event-slider__nav-btn--next'
					}
				>
					Next
				</button>
			)}
		</div>
	)
}
