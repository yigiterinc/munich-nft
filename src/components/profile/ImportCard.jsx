import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
	card: {
		height: "300",
		cursor: "pointer",
		marginRight: "50px",
		marginLeft: "50px",
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

const ImportCard = ({ collection, nft, addToSelected, removeFromSelected }) => {
	const [selected, setSelected] = useState(false);
	const classes = useStyles();

	const truncateString = (str, num) => {
		if (!str || str.length <= num) {
			return str;
		}
		return str.slice(0, num) + "...";
	};

	const handleOnClick = () => {
		if (!collection && !nft) return;

		const item = collection ? collection : nft;

		if (selected) {
			removeFromSelected(item);
		} else {
			addToSelected(item);
		}

		setSelected(!selected);
	};

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
						src={collection.image_url ? collection.image_url : "/images/no-image.png"}
						className={classes.avatar}
					/>
					<Typography className={classes.collectionName} variant="body1">
						{truncateString(collection.name, 30)}
					</Typography>
				</CardContent>
			)}
			{nft && (
				<CardContent>
					<CardMedia
						component="img"
						className={classes.image}
						image={nft.image_url ? nft.image_url : "/images/no-image.png"}
						title={nft.name}
					/>
					<Typography className={classes.collectionName} variant="body2" color="textSecondary" gutterBottom>
						{truncateString(nft.collection.name, 20)}
					</Typography>
					<Typography variant="body2" className={classes.nftName}>
						{truncateString(nft.name, 20)}
					</Typography>
				</CardContent>
			)}
		</Card>
	);
};

export default ImportCard;
