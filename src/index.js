import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';
import App from './App';
import {Provider} from 'react-redux';
import {legacy_createStore as createStore} from 'redux';
import reducer from "./reducer/reducer";


export const store = createStore(reducer)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
