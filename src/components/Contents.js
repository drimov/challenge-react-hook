import React from 'react'

const api = `https://restcountries.com/v3.1/all?fields=capital,region,currencies,flags,population,name`

const Contents = ({ search, region }) => {
	const [world, setWorld] = React.useState(null)
	const [component, setComponant] = React.useState(null)

	React.useEffect(() => {
		setWorld(null)
		fetch(api)
			.then((response) => response.json())
			.then((data) => {
				setWorld(data)
			})
			.catch((err) => console.log(err))
	}, [])

	React.useEffect(() => {
		if (search !== '') setComponant('search')
		else setComponant(null)
	}, [search])

	React.useEffect(() => {
		if (region !== 'All') setComponant('region')
		else setComponant(null)
	}, [region])

	if (world === null)
		return (
			<div>
				<p className='text-center'>Loading...</p>
			</div>
		)

	return component !== null ? (
		<div className='flex flex-wrap justify-center'>
			{component === 'search' ? (
				<ContentFilterBySearch
					world={world}
					search={search}
				/>
			) : (
				<ContentFilterByRegion
					world={world}
					region={region}
				/>
			)}
		</div>
	) : (
		<div className='flex flex-wrap justify-center'>
			<ContentDisplay dataFilter={world} />
		</div>
	)
}

const ContentDisplay = ({ dataFilter }) => {
	return dataFilter.map((item, index) => (
		<div
			key={index}
			className='region w-64 m-4 rounded-md'>
			<img
				src={item.flags.svg}
				alt='flag'
				className='h-40 mx-auto p-2'></img>
			<div className='m-4'>
				<p>Name: {item.name.official}</p>
				<p>Capital: {item.capital}</p>
				<p>Region: {item.region}</p>
				<p>Population: {item.population}</p>
				<p>
					Currencies :{' '}
					{Object.values(item.currencies).map((currency, index) => (
						<span key={index}>
							{currency.name} <br />
							Symbol : {currency.symbol}
						</span>
					))}
				</p>
			</div>
		</div>
	))
}

const ContentFilterBySearch = ({ world, search }) => {
	const dataFilter = world.filter((item) =>
		item.name.official.toLowerCase().includes(search.toLowerCase())
	)

	return <ContentDisplay dataFilter={dataFilter} />
}
const ContentFilterByRegion = ({ world, region }) => {
	const dataFilter = world.filter((item) => item.region.includes(region))

	return <ContentDisplay dataFilter={dataFilter} />
}

export default Contents
