import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Navigation, Pagination, A11y } from 'swiper/modules'

import { useMediaQuery } from '@/hooks'
import { data } from '@/store'

import 'swiper/css'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

import { EventSlider } from './EventSlider/EventSlider'

export const TimeLineSlider = () => {
	const [activePeriodIndex, setActivePeriodIndex] = useState(5)
	const isDesktop = useMediaQuery('(min-width: 992px)')

	return (
		<div className={'timeline'}>
			<h2>активный слайд {activePeriodIndex}</h2>
			<Swiper
				className={'timeline-period-slider'}
				spaceBetween={50}
				slidesPerView={1}
				modules={[Navigation, Pagination]}
				navigation
				pagination={!isDesktop ? { clickable: true } : false}
				onSwiper={(swiper) => console.log(swiper)}
				onSlideChange={(swiper) => setActivePeriodIndex(swiper.activeIndex)}
			>
				{data.map((period) => (
					<SwiperSlide key={period.id} className={'timeline-period-slider__slide'}>
						{period.label}
					</SwiperSlide>
				))}
			</Swiper>

			<EventSlider isDesktop={isDesktop} activeIndex={activePeriodIndex} />
		</div>
	)
}
