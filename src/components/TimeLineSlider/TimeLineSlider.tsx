import { useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

import { useMediaQuery } from '@/hooks'
import { data } from '@/store'

export const TimeLineSlider = () => {
	const [activePeriodIndex, setActivePeriodIndex] = useState(0)
	const isDesktop = useMediaQuery('(min-width: 768px)')

	return (
		<div className="timeline">
			<h2>активный слайд {activePeriodIndex}</h2>
			<Swiper
				className="timeline-period-slider"
				spaceBetween={50}
				slidesPerView={1}
				modules={[Navigation, Pagination]}
				navigation
				pagination={!isDesktop ? { clickable: true } : false}
				onSwiper={(swiper) => console.log(swiper)}
				onSlideChange={(swiper) => setActivePeriodIndex(swiper.activeIndex)}
			>
				{data.map((period) => (
					<SwiperSlide key={period.id} className="timeline-period-slider__slide">
						{period.label}
					</SwiperSlide>
				))}
			</Swiper>

			<Swiper
				className="timeline-event-slider"
				modules={[Navigation, A11y]}
				slidesPerView={'auto'}
				spaceBetween={25}
				grabCursor={true}
				navigation={isDesktop}
				breakpoints={{
					1024: {
						slidesPerView: 3,
						spaceBetween: 50,
					},
				}}
			>
				{data[activePeriodIndex].events.map((event) => (
					<SwiperSlide key={event.id} className="timeline-event-slider__slide">
						{event.year}
						<br />
						{event.short}
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
