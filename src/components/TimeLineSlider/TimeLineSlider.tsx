import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Navigation, Pagination, A11y } from 'swiper/modules'

import { useMediaQuery } from '@/hooks'
import { data } from '@/store'

import 'swiper/css'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

export const TimeLineSlider = () => {
	const [activePeriodIndex, setActivePeriodIndex] = useState(5)
	const isDesktop = useMediaQuery('(min-width: 992px)')

	return (
		<div className={ 'timeline' }>
			<h2>активный слайд { activePeriodIndex }</h2>
			<Swiper
				className={ 'timeline-period-slider' }
				spaceBetween={ 50 }
				slidesPerView={ 1 }
				modules={ [Navigation, Pagination] }
				navigation
				pagination={ !isDesktop ? { clickable: true } : false }
				onSwiper={ (swiper) => console.log(swiper) }
				onSlideChange={ (swiper) => setActivePeriodIndex(swiper.activeIndex) }
			>
				{ data.map((period) => (
					<SwiperSlide key={ period.id } className={ 'timeline-period-slider__slide' }>
						{ period.label }
					</SwiperSlide>
				)) }
			</Swiper>

			<div className={ 'timeline-event-slider-wrapper' }>
				{ isDesktop && (
					<button
						className={
							'timeline-event-slider__nav-btn timeline-event-slider__nav-btn--prev'
						}
					>
						Prev
					</button>
				) }

				<Swiper
					className={ 'timeline-event-slider' }
					modules={ [Navigation, A11y] }
					slidesPerView={ 'auto' }
					spaceBetween={ 25 }
					grabCursor
					navigation={
						isDesktop
							? {
									prevEl: '.timeline-event-slider__nav-btn--prev',
									nextEl: '.timeline-event-slider__nav-btn--next',
								}
							: false
					}
					breakpoints={ {
						1280: {
							spaceBetween: 40,
						},
						1440: {
							spaceBetween: 80,
						},
					} }
				>
					{ data[activePeriodIndex].events.map((event) => (
						<SwiperSlide key={ event.id } className={ 'timeline-event-slider__slide' }>
							<div className={ 'timeline-event-slider__slide-title' }>{ event.year }</div>
							<div className={ 'timeline-event-slider__slide-desc' }>{ event.short }</div>
						</SwiperSlide>
					)) }
				</Swiper>
				{ isDesktop && (
					<button
						className={
							'timeline-event-slider__nav-btn timeline-event-slider__nav-btn--next'
						}
					>
						Next
					</button>
				) }
			</div>
		</div>
	)
}
