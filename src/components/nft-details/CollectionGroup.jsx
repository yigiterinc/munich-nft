import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
	collectionGroupContainer: {
		marginTop: "0.85vw",
		display: "flex",
		alignItems: "center",
	},
	collectionSection: {
		maxWidth: "60%",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
		overflow: "hidden",
	},
	icon: {
		paddingRight: "0.5vw",
	},
});

const CollectionGroup = (nftJson) => {
	const classes = useStyles();

	return (
		<div className={classes.collectionGroupContainer}>
			<div className={classes.collectionSection}>
				<Link href="">{nftJson.collection}</Link>
			</div>
		</div>
	);
};

export default CollectionGroup;
