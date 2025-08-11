import { Container, TimeLineSlider } from './components'
import { Layout } from './Layout'
import { heading } from './store'

export default function App() {
	return (
		<Layout>
			<section className="bg-grid">
				<span className="line line--vertical" aria-hidden="true"></span>
				<TimeLineSlider title={heading} />
			</section>
		</Layout>
	)
}
