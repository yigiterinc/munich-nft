import React from "react";
import { SearchBar, CustomInputBase } from "./NavbarElements";

const Search = () => {
	return (
		<SearchBar>
			<CustomInputBase
				placeholder="Search galleries, items and accounts..."
				inputProps={{ "aria-label": "search" }}
			/>
		</SearchBar>
	);
};

export default Search;
