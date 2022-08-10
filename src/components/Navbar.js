import React from 'react';
import { Outlet } from 'react-router-dom';

const Navbar = () => {
	return (
		<>
			<nav>
				<div className='brand'>
					<i style={{ color: 'white' }} className='material-icons'>
						audiotrack
					</i>
					<a href='/'>Audio Editor</a>
				</div>
			</nav>
			<Outlet />
		</>
	);
};

export default Navbar;
