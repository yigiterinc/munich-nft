import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { truncateString, withDefault } from "../../utils/commons";

const useStyles = makeStyles((theme) => ({
	card: {
		minWidth: 140,
		height: 250,
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
	nftName: {
		marginTop: "10px",
		fontSize: "18px",
	},
	image: {
		height: "20vh",
		borderRadius: "4px",
	},
}));

const NFTImportCard = ({ name, image, addToSelected, removeFromSelected }) => {
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

	const DEFAULT_NFT_NAME = "Nameless";
	const DEFAULT_IMAGE_PATH = "/images/no-image.png";

	return (
		<Card
			className={clsx(classes.card, { [classes.cardSelected]: selected })}
			variant="outlined"
			selected={selected}
			onClick={() => handleOnClick()}
		>
			{
				<CardContent>
					<CardMedia
						component="img"
						className={classes.image}
						image={withDefault(image, DEFAULT_IMAGE_PATH)}
						title={name}
					/>
					{/* <Typography variant="body2" color="textSecondary" gutterBottom>
						{truncateString(nft.collection.name, 20)}
					</Typography> */}
					<Typography variant="body2" className={classes.nftName}>
						{truncateString(withDefault(name, DEFAULT_NFT_NAME), 20)}
					</Typography>
				</CardContent>
			}
		</Card>
	);
};

export default NFTImportCard;
