import { ReactNode } from 'react'

import { Container } from './components'

export const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<header className="header"></header>
			<main className="main">
				<Container>{children}</Container>
			</main>
			<footer className="footer"></footer>
		</>
	)
}
