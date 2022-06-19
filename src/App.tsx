import { Provider } from "react-redux";
import Table from "./Components/Table";
import store from "./redux/reduxStore";

const App = () => {
	return (
		<Provider store={store}>
			<Table />
		</Provider>
	);
};

export default App;
