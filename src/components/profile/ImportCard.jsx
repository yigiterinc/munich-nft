import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";
import { truncateString, withDefault } from "../../utils/commons";

const useStyles = makeStyles((theme) => ({
	card: {
		height: "300",
		cursor: "pointer",
	},
	cardSelected: {
		borderColor: "rgb(120, 105, 199)",
		boxShadow:
			"rgba(120, 105, 199, 0.4) 0px 0px 0px 2px, rgba(120, 105, 199, 0.65) 0px 4px 6px -1px, rgba(120, 105, 199, 0.08) 0px 1px 0px inset",
		cursor: "pointer",
	},
	cardContent: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		width: theme.spacing(15),
		height: theme.spacing(15),
		marginBottom: "5vh",
	},
	collectionName: {
		marginTop: "10px",
		fontSize: "17px",
	},
	image: {
		objectFit: "contain",
	},
	nftName: {
		fontSize: "18px",
	},
}));

const ImportCard = ({ collection, nft, addToSelected, removeFromSelected, ipfsImage }) => {
	const [selected, setSelected] = useState(false);
	const classes = useStyles();

	const handleOnClick = () => {
		if (!collection && !nft) return;
		console.log(ipfsImage);

		const item = collection ? collection : nft;

		if (selected) {
			removeFromSelected(item);
		} else {
			addToSelected(item);
		}

		setSelected(!selected);
	};

	const defaultNftName = "Nameless", defaultCollectionName = "Nameless";
	const defaultImagePath = "/images/no-image.png";

	return (
		<Card
			className={clsx(classes.card, { [classes.cardSelected]: selected })}
			variant="outlined"
			selected={selected}
			onClick={() => handleOnClick()}
		>
			{collection && (
				<CardContent className={classes.cardContent}>
					<Avatar
						alt={collection.name}
						src={ipfsImage ? collection.image : withDefault(collection.image_url, defaultImagePath)}
						className={classes.avatar}
					/>
					<Typography className={classes.collectionName} variant="body1">
						{truncateString(withDefault(collection.name, "Nameless"), 20)}
					</Typography>
				</CardContent>
			)}
			{nft && (
				<CardContent>
					<CardMedia
						component="img"
						className={classes.image}
						image={ipfsImage ? nft.image : withDefault(nft.image_url, defaultImagePath)}
						title={nft.name}
					/>
					<Typography className={classes.collectionName} variant="body2" color="textSecondary" gutterBottom>
						{truncateString(withDefault(nft.collection.name, defaultCollectionName), 20)}
					</Typography>
					<Typography variant="body2" className={classes.nftName}>
						{truncateString(withDefault(nft.name, defaultNftName), 20)}
					</Typography>
				</CardContent>
			)}
		</Card>
	);
};

export default ImportCard;
