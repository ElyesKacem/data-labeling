import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignInSide from './components/authentification/login';
import PersistentDrawerLeft from './components/Drawer/Drawer';
import SignUp from './pages/SignUp';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				{/* public routes */}
				<Route path="login" element={<SignInSide />} />
				<Route path="register" element={<SignUp />} />

				{/* protected routes */}
				<Route element={<RequireAuth />}>
					<Route path='/' element={<PersistentDrawerLeft />} />
					<Route path='/home' element={<PersistentDrawerLeft />} />
				</Route>
			</Route>
		</Routes>
	);
};

export default App;
