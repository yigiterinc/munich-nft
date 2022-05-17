import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { STRAPI_BASE_URL } from "../../constants/strapiConstants";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 200,
		minHeight: 200,
		height: "auto",
		cursor: "pointer",
		marginTop: "4vh",
		marginBottom: "4vh",
		transition: "all 0.2s ease-out",
		"&:hover": {
			transform: "scale(1.05)",
			boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
		},
	},
	image: {
		[theme.breakpoints.up("xs")]: {
			height: "30vh",
		},
		[theme.breakpoints.up("sm")]: {
			height: "25vh",
		},
	},
}));

const GalleryCard = ({ gallery, add }) => {
	const classes = useStyles();
	const history = useHistory();

	return (
		<div>
			{gallery && (
				<Card
					className={classes.root}
					variant="outlined"
					onClick={() => history.push(`/gallery/${gallery.slug}`)}
				>
					<CardMedia
						component="img"
						className={classes.image}
						image={STRAPI_BASE_URL + gallery.coverImage.url}
					/>
					<CardContent>
						<Typography variant="h6" component="h2" gutterBottom>
							{gallery.galleryName}
						</Typography>
					</CardContent>
				</Card>
			)}
		</div>
	);
};

export default GalleryCard;
