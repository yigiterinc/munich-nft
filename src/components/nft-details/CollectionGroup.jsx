import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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
	collectionLink: {
		cursor: "pointer",
		color: theme.palette.secondary.main,
		"&:focus, &:hover, &:visited, &:link, &:active": {
			textDecoration: "none",
		},
		"&:hover": {
			color: theme.palette.secondary.light,
		},
	},
	icon: {
		paddingRight: "0.5vw",
	},
}));

const CollectionGroup = (nftJson) => {
	const classes = useStyles();

	return (
		<div className={classes.collectionGroupContainer}>
			<div className={classes.collectionSection}>
				<Link
					className={classes.collectionLink}
					to={`/collection/${nftJson.slug}`}
				>
					{nftJson.collection}
				</Link>
			</div>
		</div>
	);
};

export default CollectionGroup;
