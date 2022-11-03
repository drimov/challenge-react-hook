import React from 'react'

import { MoonIcon } from '@heroicons/react/24/solid'
// import { MoonIcon as MoonOutline } from '@heroicons/react/24/outline'

const DarkMod = ({ colorMod, handleDarkMod }) => {
	return (
		<>
			<button onClick={handleDarkMod}>
				<MoonIcon
					className={`${colorMod ? 'fill-white' : 'fill-black-500'} h-16`}
				/>
			</button>
			<p>{colorMod ? 'Dark Mode' : 'Light Mode'}</p>
		</>
	)
}

const Header = (props) => {
	return (
		<header className='flex justify-between flex-row items-center p-6'>
			<div>
				<h1 className='text-5xl'>Where in the world?</h1>
			</div>
			<div className='w-64 text-center'>
				<DarkMod
					colorMod={props.colorMod}
					handleDarkMod={props.handleDarkMod}
				/>
			</div>
		</header>
	)
}

export default Header
