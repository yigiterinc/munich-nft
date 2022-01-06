import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
	searchBar: {
		width: "auto",
		height: "auto",
		display: "flex",
		alignItems: "center",
		borderRadius: "4px",
		borderStyle: "solid",
		borderWidth: "1px",
		borderColor: "#d0d0d0",
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
}));

const SearchBar = ({ placeholder }) => {
	const classes = useStyles();
	return (
		<div className={classes.searchBar}>
			<InputBase
				placeholder={placeholder}
				color="primary"
				inputProps={{ "aria-label": "search" }}
				className={classes.input}
			/>
			<IconButton
				type="submit"
				className={classes.iconButton}
				aria-label="search"
			>
				<SearchIcon />
			</IconButton>
		</div>
	);
};

export default SearchBar;
