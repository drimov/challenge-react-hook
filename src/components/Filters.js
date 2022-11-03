import React from 'react'
import {
	MagnifyingGlassIcon,
	ChevronRightIcon,
} from '@heroicons/react/24/solid'

const regionsList = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

const Filters = ({ search, region, handleRegion, handleSearchChange }) => {
	const [open, setOpen] = React.useState(false)
	const handleClick = () => {
		setOpen(!open)
	}

	return (
		<div className='flex flex-col sm:flex-row justify-between mx-10 h-16 my-24 md:my-10'>
			<SearchBar
				search={search}
				handleSearchChange={handleSearchChange}
			/>
			<FilterBar
				handleClick={handleClick}
				handleRegion={handleRegion}
				region={region}
				open={open}
			/>
		</div>
	)
}

const SearchBar = ({ search, handleSearchChange }) => {
	return (
		<div className='search-bar flex flex-row rounded-md items-center my-2 md:m-0'>
			<MagnifyingGlassIcon className={`h-10 m-3 hidden md:block`} />
			<input
				type={'text'}
				placeholder='Search for a country...'
				value={search}
				onChange={(e) => handleSearchChange(e.target.value)}
				className='text-xl md:m-3 w-min rounded-md m-3'
			/>
		</div>
	)
}
const FilterBar = ({ handleClick, handleRegion, region, open }) => {
	return (
		<div className='relative flex flex-col w-70'>
			<div className='region-button flex flex-row items-center rounded-md px-2 m-2 md:m-0'>
				<button
					onClick={handleClick}
					className='text-xl my-4 mx-2'>
					{`Filter by Region : ${region ? region : 'All'}`}
				</button>
				<ChevronRightIcon
					className={`h-5 ${open ? 'arrow-down' : 'arrow-init'}`}
				/>
			</div>
			{open ? (
				<div className='region-select flex my-2 rounded-sm'>
					<ul className='menu-region mt-4'>
						{regionsList.map((regionItem, index) => (
							<li
								key={index}
								onClick={(e) => handleRegion(regionItem, e)}
								className='m-1 mx-3 item-region'>
								{regionItem}
							</li>
						))}
						{region !== 'All' ? (
							<li
								key={'all'}
								className='m-1 mx-3 item-region'
								onClick={(e) => handleRegion('All', e)}>
								All
							</li>
						) : null}
					</ul>
				</div>
			) : null}
		</div>
	)
}

export default Filters
