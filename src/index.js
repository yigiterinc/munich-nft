import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axiosRetry from "axios-retry";
import axios from "axios";
import { COLORS, FONTS } from "./theme/variables";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

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

const theme = createTheme({
	typography: {
		htmlFontSize: FONTS.default,
		fontFamily: ["Readex Pro", "sans-serif"].join(","),
	},
});

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
