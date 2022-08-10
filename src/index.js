import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "./contexts/AuthProvider";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

ReactDOM.render(
	<React.Fragment>
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path='/*' element={<App />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	</React.Fragment>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
