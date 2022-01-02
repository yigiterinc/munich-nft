import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
	searchBar: {
		width: "auto",
		height: "auto",
		display: "flex",
		alignItems: "center",
	},
	input: {
		flex: 1,
	},
	searchIcon: {
		fill: "gray",
		margin: 5,
	},
}));

const SearchBar = ({ placeholder, options }) => {
	const [inputValue, setInputValue] = useState();
	const classes = useStyles();
	return (
		<div className={classes.searchBar}>
			<Autocomplete
				className={classes.input}
				inputValue={inputValue}
				onInputChange={(event) => setInputValue(event.target.value)}
				freeSolo
				options={options?.map((option) => option)}
				open={inputValue?.length > 1}
				renderInput={(params) => (
					<TextField
						{...params}
						placeholder={placeholder}
						margin="normal"
						variant="outlined"
						InputProps={{
							...params.InputProps,
							startAdornment: <SearchIcon className={classes.searchIcon} />,
						}}
					/>
				)}
			/>
		</div>
	);
};

export default SearchBar;
