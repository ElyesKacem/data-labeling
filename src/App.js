import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignInSide from './components/authentification/login';
import PersistentDrawerLeft from './components/Drawer/Drawer';
import SignUp from './pages/SignUp';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import ProjectsList from './components/ProjectsList';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
			
				{/* public routes */}
				<Route path="login" element={<SignInSide />} />
				<Route path="register" element={<SignUp />} />
				<Route path='/' element={<PersistentDrawerLeft />} >
					<Route path="/" element={<ProjectsList />} />
				</Route>
				<Route path='/home' element={<PersistentDrawerLeft />} />
				


				{/* protected routes */}
				<Route element={<RequireAuth />}>
					
				</Route>
			</Route>
		</Routes>
	);
};

export default App;
