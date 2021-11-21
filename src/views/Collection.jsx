import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CollectionHeader from "../components/collection/CollectionHeader";

const useStyles = makeStyles((theme) => ({
	gridContainer: {
		paddingTop: "3vw",
		paddingLeft: "10vw",
		paddingRight: "10vw",
	},
}));

const Collection = () => {
	const classes = useStyles();

	return (
		<Grid container spacing={4} className={classes.gridContainer}>
			<Grid item xs={12}>
				<CollectionHeader />
			</Grid>
		</Grid>
	);
};

export default Collection;
