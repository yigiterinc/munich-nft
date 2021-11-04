import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	nftContainer: {},
}));

const NftImage = (url) => {
	const classes = useStyles();
	return (
		<Card>
			<CardActionArea>
				<CardMedia component="img" height="500" url={url} />
			</CardActionArea>
			<CardActions>
				<Button size="small" color="primary">
					Like
				</Button>
			</CardActions>
		</Card>
	);
};

export default NftImage;
