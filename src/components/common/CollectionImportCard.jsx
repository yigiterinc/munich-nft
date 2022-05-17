import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";
import { truncateString, withDefault } from "../../utils/commons";

const useStyles = makeStyles((theme) => ({
	card: {
		minWidth: 140,
		minHeight: 200,
		height: "auto",
		cursor: "pointer",
		transition: "all 0.2s ease-out",
		"&:hover": {
			transform: "scale(1.05)",
			boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
		},
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
		width: theme.spacing(9),
		height: theme.spacing(9),
		marginBottom: "2vh",
	},
	name: {
		marginTop: "10px",
		fontSize: "17px",
	},
	image: {
		height: "30vh",
	},
	nftName: {
		fontSize: "18px",
	},
}));

const CollectionImportCard = ({
	name,
	image,
	addToSelected,
	removeFromSelected,
}) => {
	const [selected, setSelected] = useState(false);
	const classes = useStyles();

	const handleOnClick = () => {
		if (selected) {
			removeFromSelected();
		} else {
			addToSelected();
		}

		setSelected(!selected);
	};

	const DEFAULT_COLLECTION_NAME = "Nameless";

	return (
		<Card
			className={clsx(classes.card, { [classes.cardSelected]: selected })}
			variant="outlined"
			selected={selected}
			onClick={() => handleOnClick()}
		>
			{
				<CardContent className={classes.cardContent}>
					<Avatar
						alt={name}
						src={image} // ipfsImage ? nft.image : withDefault(nft.image_url, DEFAULT_IMAGE_PATH)
						className={classes.avatar}
					/>
					<Typography className={classes.name}>
						{truncateString(withDefault(name, DEFAULT_COLLECTION_NAME), 20)}
					</Typography>
				</CardContent>
			}
		</Card>
	);
};

export default CollectionImportCard;
