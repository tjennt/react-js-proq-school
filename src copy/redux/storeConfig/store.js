import { createStore, applyMiddleware, compose } from "redux";
import createDebounce from "redux-debounced";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";
import { persistStore } from "redux-persist";
import rootSaga from "../saga";
const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunk, sagaMiddleware, createDebounce()];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);
export { store, persistor };
