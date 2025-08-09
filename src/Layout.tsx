import { ReactNode } from 'react'

import { Container } from './components'

export const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<header>header</header>
			<main>
				<Container>{children}</Container>
			</main>
			<footer>footer</footer>
		</>
	)
}
