import React, { useState, useEffect } from "react";
import Dropdown from "../common/Dropdown";
import SearchBar from "../common/SearchBar";
import FilterGroup from "./FilterGroup";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	topContainer: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: theme.spacing(6),
		"& > :nth-child(2)": {
			width: theme.spacing(35),
		},
		"& > :nth-child(3)": {
			width: theme.spacing(20),
			marginLeft: theme.spacing(1),
		},
		filterGroup: {
			flex: 1,
		},
		searchBar: {
			flex: 2,
		},
		sort: {
			flex: 1,
		},
	},
}));

const CollectionMenu = () => {
	const [dropdownValue, setDropdownValue] = useState();
	const classes = useStyles();

	const sortingOptions = [
		"Recently created",
		"Recently sold",
		"Price ascending",
		"Price descending",
		"Most favorited",
	];

	return (
		<div className={classes.topContainer}>
			<FilterGroup className={classes.filterGroup} />
			<SearchBar placeholder="Search" className={classes.searchBar} />
			<Dropdown
				options={sortingOptions}
				onChange={(e) => {
					setDropdownValue(e);
				}}
				value={dropdownValue}
				placeholder="Sort by"
				className={classes.sort}
			/>
		</div>
	);
};

export default CollectionMenu;
