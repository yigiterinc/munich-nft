import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	collectionSection: {
		marginTop: "1vh",
		maxWidth: "60%",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
		overflow: "hidden",
	},
	collectionLink: {
		color: theme.palette.primary.main,
		cursor: "pointer",
		"&:focus, &:hover, &:visited, &:link, &:active": {
			textDecoration: "none",
		},
		"&:hover": {
			fontWeight: "bold",
		},
	},
	icon: {
		paddingRight: "0.5vw",
	},
}));

const CollectionGroup = (props) => {
	const classes = useStyles();

	return (
		<div className={classes.collectionSection}>
			<Link
				className={classes.collectionLink}
				to={`/collection/${props.nftJson.slug}`}
			>
				{props.nftJson.collection}
			</Link>
		</div>
	);
};

export default CollectionGroup;
