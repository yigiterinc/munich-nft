import React from "react";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/core/styles";
import { STRAPI_BASE_URL } from "../../constants/strapiConstants";

const useStyles = makeStyles((theme) => ({
	avatar: ({ isCircle, height, width }) => ({
		marginTop: "2vh",
		borderRadius: isCircle ? "50%" : 10,
		width: width,
		height: height,
		background: "rgb(224,227,225)",
	}),
	image: ({ height, width, isCircle }) => ({
		objectFit: "cover",
		borderRadius: isCircle ? "50%" : 10,
		height: height,
		width: width,
	}),
}));

const ImageContainer = ({ image, isCircle = false, height, width }) => {
	const classes = useStyles({ isCircle, height, width });

	const ImageContainer = () => {
		if (image?.url) {
			return (
				<img
					src={STRAPI_BASE_URL + image.url}
					alt="preview"
					className={classes.image}
				/>
			);
		} else {
			return (
				<Avatar className={classes.avatar}>
					{isCircle ? <PersonIcon /> : <ImageIcon />}
				</Avatar>
			);
		}
	};

	return ImageContainer();
};

export default ImageContainer;
