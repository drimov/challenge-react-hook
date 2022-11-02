import './App.css'
import Header from './components/Header'
import Filters from './components/Filters'
import Contents from './components/Contents'
import React from 'react'
// import {ErrorBoundary} from 'react-error-boundary'

const api = `https://restcountries.com/v3.1/all?fields=capital,region,currencies,flags,population,name`

const App = () => {
	//APP
	const [theme, setTheme] = React.useState(
		() => window.localStorage.getItem('theme') || null
	)
	const [darkMod, setDarkMod] = React.useState(() =>
		theme === 'dark' ? true : false
	)
	// const [error, setError] = React.useState(null)

	//Contents
	const [world, setWorld] = React.useState(null)
	const [filterBy, setFilter] = React.useState(null)

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
		if (value !== '') {
			setFilter(
				world.filter((item) =>
					item.name.official.toLowerCase().includes(value.toLowerCase())
				)
			)
		} else setFilter(world)
	}

	const handleRegion = (value) => {
		setRegion(value)
		if (value !== 'All') {
			setFilter(world.filter((item) => item.region.includes(value)))
		} else setFilter(world)
	}

	React.useEffect(() => {
		window.localStorage.setItem('theme', darkMod ? 'dark' : 'light')
		document.documentElement.setAttribute(
			'data-theme',
			darkMod ? 'dark' : 'light'
		)
	}, [darkMod])

	React.useEffect(() => {
		setWorld(null)
		fetch(api)
			.then((response) => response.json())
			.then((data) => {
				setWorld(data)
				setFilter(data)
			})
			.catch((err) => console.log(err))
	}, [])

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
			<Contents filterBy={filterBy} />
		</>
	)
}

export default App
