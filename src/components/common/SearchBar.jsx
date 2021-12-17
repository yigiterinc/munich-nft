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
		borderRadius: theme.shape.borderRadius,
		borderStyle: "solid",
		borderWidth: "2px",
		borderColor: theme.palette.primary.dark,
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
				inputProps={{ "aria-label": "search" }}
				className={classes.input}
			/>
			<IconButton
				type="submit"
				classes={{ input: classes.input }}
				aria-label="search"
			>
				<SearchIcon />
			</IconButton>
		</div>
	);
};

export default SearchBar;
