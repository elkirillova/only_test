import { useState } from 'react'

import { useMediaQuery } from '@/hooks'
import { data } from '@/store'

import 'swiper/css'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

import { EventSlider } from './EventSlider/EventSlider'
import { TimelinePeriodSlider } from './TimelinePeriodSlider/TimelinePeriodSlider'

export const TimeLineSlider = () => {
	const [activePeriodIndex, setActivePeriodIndex] = useState(0)
	const isDesktop = useMediaQuery('(min-width: 992px)')

	return (
		<div className={'timeline'}>
			<TimelinePeriodSlider slides={data} onChangeActiveIndex={setActivePeriodIndex} />
			<EventSlider isDesktop={isDesktop} activeIndex={activePeriodIndex} />
		</div>
	)
}
