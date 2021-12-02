import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axiosRetry from "axios-retry";
import axios from "axios";

require("dotenv").config();

axiosRetry(axios, {
	retries: 5,
	retryDelay: (retryCount) => {
		return retryCount * 500; // time interval between retries
	},
	retryCondition: (error) => {
		return error.response.status === 429;
	},
});

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
