import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignInSide from './components/authentification/login';
import PersistentDrawerLeft from './components/Drawer/Drawer';
import SignUp from './pages/SignUp';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import PersistantAuth from './components/PersistantAuth';
import ProjectsList from './components/ProjectsList';
import Organization from './pages/Organization';
import { Settings } from './pages/Settings';
import { Logout } from './pages/Logout';
import Navbar from './components/Navbar';
import Accounts from './pages/Accounts';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import Stt from './components/ProjectPages/STT/Stt';
// import Stt from './components/ProjectPages/STT/Stt';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
			
				<Route path="/audio" element={<AudioPlayer />} />
				{/* public routes */}
				<Route element={<Navbar />}>
					<Route path="login" element={<SignInSide />} />
					<Route path="register" element={<SignUp />} />
				</Route>

				{/* protected routes */}
				<Route element={<PersistantAuth />}>
					<Route element={<RequireAuth />}>
						<Route path='/' element={<PersistentDrawerLeft />} >
							<Route path="/projects" element={<ProjectsList />} />
							<Route path="/Organization" element={<Organization />} />
							<Route path="/Accounts" element={<Accounts />} />
							<Route path="/Settings" element={<Settings />} />
							<Route path="/Logout" element={<Logout />} />
							<Route path="/project/:projectId" element={<Stt />} />
							<Route path="/project/:projectId/:userRole" element={<Stt />} />
						</Route>
					</Route>
				</Route>
			</Route>
		</Routes>
	);
};

export default App;
