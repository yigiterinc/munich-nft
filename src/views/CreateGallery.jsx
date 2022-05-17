import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import FileDropzone from "../components/common/FileDropzone";
import AddGalleryMetadata from "../components/create-gallery/AddGalleryMetadata";

import { darken, makeStyles } from "@material-ui/core/styles";
import {
	createGallery,
	uploadImageToMediaGallery,
} from "../api/strapi";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { getLoggedInUser, isUserLoggedIn } from "../utils/auth-utils";
import { useHistory } from "react-router-dom";
import { convertToSlug } from "../utils/commons";

const Alert = (props) => {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme) => ({
	navigationButton: {
		color: "#FFFFFF",
		margin: "13px 25px",
		padding: "13px 25px",
		"&:disabled": {
			opacity: "80%",
		},
		background: "#b35bff",
		"&:hover": {
			background: darken("#b35bff", 0.1),
		},
	},
}));

const CreateGallery = (props) => {
	const [galleryName, setGalleryName] = useState();
	const [galleryDescription, setGalleryDescription] = useState();
	const [coverImage, setCoverImage] = useState();
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const user = getLoggedInUser();

	const history = useHistory();
	const classes = useStyles();

	const createGallerySubmit = async () => {
		if (!isUserLoggedIn()) {
			history.push("/");
			return;
		}

		const allRequiredParamsEntered =
			galleryName && galleryDescription && coverImage;

		if (!user || !allRequiredParamsEntered) {
			setError(true);
			return;
		}

		const uploadResult = await uploadImageToMediaGallery(coverImage);
		const imageIdentifier = uploadResult.data[0];
		const gallery = {
			galleryName,
			description: galleryDescription,
			slug: convertToSlug(galleryName),
			coverImage: imageIdentifier,
			assets: [],
			userId: user.id,
			username: user.username,
		};

		console.log(gallery);

		const updateResult = await createGallery(gallery);
		if (updateResult.status === 200) {
			setSuccess(true);
			const twoSecondsInMS = 2000;
			redirectAfterDelay(
				`/gallery/${convertToSlug(galleryName)}`,
				twoSecondsInMS
			);
		} else {
			setError(true);
		}

		console.log(updateResult);
	};

	const redirectAfterDelay = (url, delay) => {
		window.setTimeout(() => {
			history.push(url);
		}, delay);
	};

	const submitButton = (
		<Button
			className={classes.navigationButton}
			size="large"
			onClick={async () => await createGallerySubmit()}
			variant="contained"
			disabled={!(galleryName && galleryDescription && coverImage)}
		>
			Submit
		</Button>
	);
	const handleDropzoneSubmit = async (file) => {
		setCoverImage(file);
	};

	const dropzone = (
		<FileDropzone
			dropzoneStyles={{
				minWidth: "40vw",
				minHeight: "30vh",
				textAlign: "center",
			}}
			text="Click or drag to upload a cover image"
			handleSubmit={handleDropzoneSubmit}
			handleChangeStatus={() => console.log("status changed")}
		/>
	);

	return (
		<>
			<AddGalleryMetadata
				submitButton={submitButton}
				fileUploader={dropzone}
				coverImage={coverImage}
				setCoverImage={setCoverImage}
				collectionName={galleryName}
				setGalleryName={setGalleryName}
				galleryDescription={galleryDescription}
				setGalleryDescription={setGalleryDescription}
			/>
			<Snackbar
				open={success}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				autoHideDuration={3000}
				onClose={() => setSuccess(false)}
			>
				<Alert severity="success" onClose={() => setSuccess(false)}>
					Your gallery is successfully created
				</Alert>
			</Snackbar>
			<Snackbar
				open={error}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				onClose={() => setError(false)}
			>
				<Alert severity="error" onClose={() => setError(false)}>
					An error occurred :(
				</Alert>
			</Snackbar>
		</>
	);
};

export default CreateGallery;
