import React from "react";
import { Provider } from "react-redux";
import Table from "./Components/Table";
import store from "./redux/reduxStore";
//import classes from "./App.module.css";

const App = () => {
	return <Table />;
};

const MainApp = () => {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
};

export default MainApp;
