import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia } from "@material-ui/core";
import FileDropzone from "../common/FileDropzone";

const useStyles = makeStyles({
	galleryCoverImageContainer: {
		borderRadius: "10px",
	},
	galleryCoverImage: {
		// objectFit: "cover",
		maxWidth: "100%",
	},
});

const GalleryCoverImage = (props) => {
	const classes = useStyles();

	return (
		<div key={props.coverImage}>
			{props.isOwner && props.isEditable ? (
				<FileDropzone
					dropzoneStyles={{
						width: "400px",
						height: "400px",
					}}
					handleSubmit={props.handleDropzoneSubmit}
					handleChangeStatus={() => console.log("status changed")}
					coverImage={
						<Card className={classes.galleryCoverImageContainer}>
							<CardMedia component="img" src={props.coverImage} />
						</Card>
					}
				/>
			) : (
				<Card className={classes.galleryCoverImageContainer}>
					<CardMedia
						className={classes.galleryCoverImage}
						component="img"
						src={props.coverImage}
					/>
				</Card>
			)}
		</div>
	);
};

export default GalleryCoverImage;
