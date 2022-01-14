import React from "react";
import { Card, CardMedia, makeStyles } from "@material-ui/core";
import FileDropzone from "../../common/FileDropzone";
import { STRAPI_BASE_URL } from "../../../constants/strapiConstants";

const useStyles = makeStyles({
	galleryCoverImageContainer: {
		width: "380px",
		height: "380px",
		borderRadius: "10px",
		border: "1px solid rgb(229, 232, 235)",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	galleryCoverImage: {
		maxWidth: "100%",
	},
});

const GalleryCoverImage = (props) => {
	const classes = useStyles();
	let imageSrc;
	if (props.coverImage !== null) {
		if ("preview" in props.coverImage) {
			console.log("submit e basınca burda");
			imageSrc = props.coverImage.preview;
		} else {
			imageSrc = STRAPI_BASE_URL + props.coverImage.url;
		}
	}
	return (
		<>
			{props.coverImage && (
				<div key={props.coverImage}>
					{props.isOwner && props.isEditable ? (
						<FileDropzone
							dropzoneStyles={{
								width: "380px",
								height: "380px",
							}}
							handleSubmit={props.handleDropzoneSubmit}
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
								className={classes.galleryCoverImage}
								component="img"
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
