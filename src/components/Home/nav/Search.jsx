import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles({
	searchBar: {
		position: "relative",
		borderRadius: "8px",
		borderStyle: "solid",
		borderWidth: "2px",
		borderColor: "#d0d0d0",
		marginLeft: "auto",
		marginRight: "1rem",
	},
	inputField: {
		width: "400px",
		padding: "0.5rem",
		paddingLeft: "10px",
	},
});

const Search = () => {
	const classes = useStyles();
	return (
		<div className={classes.searchBar}>
			<InputBase
				placeholder="Search galleries, items and accounts..."
				inputProps={{ "aria-label": "search" }}
				className={classes.inputField}
			/>
		</div>
	);
};

export default Search;
