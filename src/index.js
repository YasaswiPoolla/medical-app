import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import store from "./store";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "react-tooltip/dist/react-tooltip.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Loader from "./Interceptor/Interceptor";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<Loader></Loader>
			<App />
		</PersistGate>
		{/* <App /> */}
	</Provider>
);

reportWebVitals();
