import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import rootReducer from "./Reducer";

const middleware = [thunk];
const persistConfig = {
	key: "root",
	storage,
	whitelist: ["departments"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
	persistedReducer,
	composeWithDevTools(applyMiddleware(...middleware))
);

store.subscribe(() => {
	console.log("Store updated:", store.getState());
});

const persistor = persistStore(store);

persistor.subscribe(() => {
	console.log("Persistor state:", persistor.getState());
});

export { store, persistor };
