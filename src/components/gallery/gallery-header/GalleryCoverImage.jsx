import React, {useState} from "react";
import { Card, CardMedia, makeStyles } from "@material-ui/core";
import FileDropzone from "../../common/FileDropzone";
import { STRAPI_BASE_URL } from "../../../constants/strapiConstants";
import ImageUploadWithPreview from "../../common/ImageUploadWithPreview";
import { getLoggedInUser } from "../../../utils/auth-utils";

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
	const [updatedGalleryImage, setUpdatedGalleryImage] = useState();

	const classes = useStyles();
	return (
		<>
			{props.coverImage && (
				<div key={props.coverImage}>
					{props.isEditable ? (
						<ImageUploadWithPreview
							height={250}
							width={250}
							userId={getLoggedInUser().id}
							image={props.coverImage}
							setNewImage={(uploadedImage) => setUpdatedGalleryImage(uploadedImage)}
						/>

					) : (
						<Card className={classes.galleryCoverImageContainer}>
							<CardMedia
								component="img"
								className={classes.galleryCoverImage}
								src={props.coverImage}
							/>
						</Card>
					)}
				</div>
			)}
		</>
	);
};

export default GalleryCoverImage;
