type EventType = {
	id: number
	year: number
	short: string
}

type ItemCircular = {
	id: number
	label: string
	range: number[]
	events: EventType[]
}

type DataType = ItemCircular[]

export type CircularSliderProps = {
	onChangeActiveIndex?: (index: number) => void
	slides: DataType
}
