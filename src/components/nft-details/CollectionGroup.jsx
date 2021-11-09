import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles({
	collectionGroupContainer: {
		marginTop: "0.85vw",
		display: "flex",
		alignItems: "center",
	},
	section: {
		display: "flex",
		marginLeft: "1vw",
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
	let like = 1;
	let view = 1;

	return (
		<div className={classes.collectionGroupContainer}>
			<div className={classes.collectionSection}>
				<Link href="">{nftJson.collection}</Link>
			</div>
			{view > 0 ? (
				<div className={classes.section}>
					<VisibilityIcon className={classes.icon} />
					<Typography>{view} views</Typography>
				</div>
			) : (
				<div />
			)}
			{like > 0 ? (
				<div className={classes.section}>
					<FavoriteBorderIcon className={classes.icon} />
					<Typography>{like} likes</Typography>
				</div>
			) : (
				<div />
			)}
		</div>
	);
};

export default CollectionGroup;
