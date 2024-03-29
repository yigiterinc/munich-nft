import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import { makeStyles } from "@material-ui/core/styles";
import { truncateWalletAddress } from "../../utils/commons";

const useStyles = makeStyles((theme) => ({
	collectionHeaderContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	banner: {
		minHeight: theme.spacing(40),
		width: "80vw",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#d6d6d6",
		backgroundImage: (collection) => `url(${collection?.banner_image_url})`,
	},
	image: {
		objectFit: "cover",
		marginTop: theme.spacing(-11),
		borderRadius: "50%",
		height: theme.spacing(14),
		width: theme.spacing(14),
	},
	avatar: {
		marginTop: theme.spacing(-11),
		borderRadius: "50%",
		height: theme.spacing(14),
		width: theme.spacing(14),
	},
	name: {
		marginTop: theme.spacing(2),
		fontWeight: "lighter",
	},
	description: {
		marginTop: theme.spacing(1),
		width: "30vw",
		fontWeight: "lighter",
		textAlign: "center",
	},
}));

const CollectionHeader = ({ collection, assets }) => {
	const classes = useStyles(collection);

	return (
		<div className={classes.collectionHeaderContainer}>
			<Paper className={classes.banner}></Paper>
			{collection?.image_url ? (
				<img
					src={collection?.image_url}
					alt="collection-image"
					className={classes.image}
				/>
			) : (
				<Avatar className={classes.avatar}>
					<ImageIcon />
				</Avatar>
			)}
			<Typography className={classes.name} variant="h5" component="h2">
				{collection?.name}
			</Typography>
			{assets && (
				<Typography className={classes.name} variant="h6" component="h2">
					{assets[0]?.creator?.user?.username
						? assets[0]?.creator?.user?.username
						: truncateWalletAddress(assets[0]?.creator?.address, 13)}
				</Typography>
			)}
			<Typography
				className={classes.description}
				component="h2"
			>
				{collection?.description}
			</Typography>
		</div>
	);
};

export default CollectionHeader;
