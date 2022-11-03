import './App.css'
import Header from './components/Header'
import Filters from './components/Filters'
import Contents from './components/Contents'
import React from 'react'
// import {ErrorBoundary} from 'react-error-boundary'

const App = () => {
	//APP
	const [theme, setTheme] = React.useState(
		() => window.localStorage.getItem('theme') || null
	)
	const [darkMod, setDarkMod] = React.useState(() =>
		theme === 'dark' ? true : false
	)

	//Filters
	const [search, setSearch] = React.useState('')
	const [region, setRegion] = React.useState('All')

	//APP
	const handleDarkMod = () => {
		setTheme(!darkMod ? 'dark' : 'light')
		setDarkMod(!darkMod)
	}

	//Filters
	const handleSearchChange = (value) => {
		setSearch(value)
	}

	const handleRegion = (value) => {
		setRegion(value)
	}

	React.useEffect(() => {
		window.localStorage.setItem('theme', darkMod ? 'dark' : 'light')
		document.documentElement.setAttribute(
			'data-theme',
			darkMod ? 'dark' : 'light'
		)
	}, [darkMod])

	return (
		<>
			<Header
				colorMod={darkMod}
				handleDarkMod={handleDarkMod}
			/>
			<Filters
				search={search}
				region={region}
				handleRegion={handleRegion}
				handleSearchChange={handleSearchChange}
			/>
			<Contents
				search={search}
				region={region}
			/>
		</>
	)
}

export default App
