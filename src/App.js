import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditPage from './pages/EditPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignInSide from './components/authentification/login';
import PersistentDrawerLeft from './components/Drawer/Drawer';

const App = () => {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route path='/' component={PersistentDrawerLeft} exact />
				<Route path='/edit' component={EditPage} exact />
			</Switch>
			{/* <Footer /> */}
		</Router>
	);
};

export default App;
