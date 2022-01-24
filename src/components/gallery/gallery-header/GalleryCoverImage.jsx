import React from "react";
import { Card, CardMedia, makeStyles } from "@material-ui/core";
import FileDropzone from "../../common/FileDropzone";
import { STRAPI_BASE_URL } from "../../../constants/strapiConstants";

const useStyles = makeStyles({
	galleryCoverImageContainer: {
		width: "300px",
		height: "300px",
		display: "flex",
	},
	galleryCoverImage: {
		width: "100%",
		height: "100%",
		objectFit: "cover",
	},
});

const GalleryCoverImage = (props) => {
	let imageSrc;
	if (props.coverImage !== null) {
		if ("preview" in props.coverImage) {
			imageSrc = props.coverImage.preview;
		} else {
			imageSrc = STRAPI_BASE_URL + props.coverImage.url;
		}
	}

	const classes = useStyles();
	return (
		<>
			{props.coverImage && (
				<div key={props.coverImage}>
					{props.isOwner && props.isEditable && !props.isCoverImageUpdated ? (
						<FileDropzone
							dropzoneStyles={{
								width: "300px",
								height: "300px",
							}}
							handleSubmit={(file) => {
								props.handleDropzoneSubmit(file);
								props.setIsCoverImageUpdated(true);
							}}
							handleChangeStatus={() => console.log("status changed")}
							coverImage={
								<Card className={classes.galleryCoverImageContainer}>
									<CardMedia component="img" src={imageSrc} />
								</Card>
							}
						/>
					) : (
						<Card className={classes.galleryCoverImageContainer}>
							<CardMedia
								component="img"
								className={classes.galleryCoverImage}
								src={imageSrc}
							/>
						</Card>
					)}
				</div>
			)}
		</>
	);
};

export default GalleryCoverImage;
