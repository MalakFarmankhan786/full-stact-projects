import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

// Import styles
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

// Import components
import App from "./App";

// Import reducers
import product from "./store/reducers/product";

// Import Web Vitals
import reportWebVitals from "./reportWebVitals";

// Combine reducers
const rootReducers = combineReducers({ product });

// Redux DevTools Extension setup
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create the Redux store
const store = createStore(
  rootReducers,
  composeEnhancer(applyMiddleware(thunk))
);

// Create a root element
const rootElement = document.getElementById("root");

// Render the app
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// Measure performance in the app
reportWebVitals();
