import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
	cardContainer: {
		borderRadius: 10,
		border: "1px solid rgb(229, 232, 235)",
		overflow: "hidden",
	},
	cardMedia: {
		height: "40vh",
		objectFit: "contain",
	},
	cardActions: {
		display: "flex",
		justifyContent: "space-between",
	},
	likeButtonContainer: {
		display: "flex",
		alignItems: "center",
	},
});

const GallerySummary = ({ gallery }) => {
	const classes = useStyles();
	const [isLiked, setIsLiked] = useState(false);
	const toggleLikeButton = () => setIsLiked(!isLiked);

	return (
		<div className={classes.cardContainer}>
			<Card>
				<CardMedia
					component="img"
					image={gallery?.image}
					className={classes.cardMedia}
				/>
				<CardActions className={classes.cardActions}>
					<Typography className={classes.creator} variant="body2">
						Created by ...
					</Typography>

					<div className={classes.likeButtonContainer}>
						{isLiked ? (
							<IconButton
								size="small"
								aria-label="fav-button"
								className={classes.likeButton}
							>
								<FavoriteIcon
									onClick={() => {
										toggleLikeButton();
									}}
									color="secondary"
								/>
							</IconButton>
						) : (
							<IconButton
								size="small"
								aria-label="fav-button"
								className={classes.likeButton}
								onClick={() => {
									toggleLikeButton();
								}}
							>
								<FavoriteBorderIcon color="secondary" />
							</IconButton>
						)}
						<Typography className={classes.likeText}>0</Typography>
					</div>
				</CardActions>
			</Card>
		</div>
	);
};

export default GallerySummary;
