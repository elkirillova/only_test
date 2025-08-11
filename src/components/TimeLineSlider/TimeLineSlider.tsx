import { ReactNode, useState } from 'react'

import { useMediaQuery } from '@/hooks'
import { data, heading } from '@/store'

import 'swiper/css'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

import { EventSlider } from './EventSlider/EventSlider'
import { TimelinePeriodSlider } from './TimelinePeriodSlider/TimelinePeriodSlider'

type Props = {
	title: ReactNode
}

export const TimeLineSlider = ({ title }: Props) => {
	const [activePeriodIndex, setActivePeriodIndex] = useState(0)
	const isDesktop = useMediaQuery('(min-width: 992px)')

	return (
		<div className={'timeline'}>
			<h2 className="timeline__heading">{title}</h2>
			<TimelinePeriodSlider slides={data} onChangeActiveIndex={setActivePeriodIndex} />
			<EventSlider isDesktop={isDesktop} activeIndex={activePeriodIndex} />
		</div>
	)
}
