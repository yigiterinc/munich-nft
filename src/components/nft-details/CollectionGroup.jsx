import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

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
	collectionLink: {
		cursor: "pointer",
		"&:focus, &:hover, &:visited, &:link, &:active": {
			textDecoration: "none",
		},
	},
	icon: {
		paddingRight: "0.5vw",
	},
});

const CollectionGroup = (nftJson) => {
	const path = `/collection/${nftJson.slug}`;
	const classes = useStyles();

	const redirectToCollectionPage = () => {
		window.location.href = path;
	};

	return (
		<div className={classes.collectionGroupContainer}>
			<div className={classes.collectionSection}>
				<Link
					className={classes.collectionLink}
					onClick={redirectToCollectionPage}
				>
					{nftJson.collection}
				</Link>
			</div>
		</div>
	);
};

export default CollectionGroup;
