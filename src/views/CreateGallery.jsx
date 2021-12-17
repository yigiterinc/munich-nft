import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import FileDropzone from "../components/common/FileDropzone";
import AddGalleryMetadata from "../components/create-gallery/AddGalleryMetadata";
import SelectGalleryNfts from "../components/create-gallery/SelectGalleryNfts";
import { darken, makeStyles } from "@material-ui/core/styles";
import {
	createGallery,
	convertSelectedNftsToGalleryAssets,
	saveImportedNfts,
	updateUser,
	uploadImageToMediaGallery,
} from "../api/strapi";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { getLoggedInUser, isUserLoggedIn } from "../utils/auth-utils";
import { useHistory } from "react-router-dom";

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

const CreateGallery = () => {
	const [galleryName, setGalleryName] = useState();
	const [galleryDescription, setGalleryDescription] = useState();
	const [coverImage, setCoverImage] = useState();
	const [activeStep, setActiveStep] = useState(0);
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const user = getLoggedInUser();

	const history = useHistory();
	const classes = useStyles();

	const handleSubmit = async (selectedCollections, selectedNfts) => {
		if (!isUserLoggedIn()) {
			history.push("/");
			return;
		}

		let user = getLoggedInUser();
		const allRequiredParamsEntered =
			galleryName &&
			galleryDescription &&
			coverImage &&
			(selectedCollections || selectedNfts);

		if (!user || !allRequiredParamsEntered) {
			setError(true);
			return;
		}

		let assets;
		if (selectedNfts) {
			assets = convertSelectedNftsToGalleryAssets(selectedNfts);
		} else if (selectedCollections) {
			assets = selectedCollections;
		} else {
			return;
		}

		const uploadResult = await uploadImageToMediaGallery(coverImage);
		const imageIdentifier = uploadResult.data[0];
		const gallery = {
			galleryName,
			description: galleryDescription,
			slug: convertToSlug(galleryName),
			coverImage: imageIdentifier,
			assets: assets,
			userId: user.id,
			username: user.username,
		};

		const updateResult = await createGallery(gallery);
		if (updateResult.status === 200) {
			setSuccess(true);
		} else {
			setError(true);
		}

		console.log(updateResult);
	};

	const convertToSlug = (galleryName) => {
		return galleryName.toLowerCase().replaceAll(" ", "_");
	};

	const nextButton = (
		<Button
			className={classes.navigationButton}
			size="large"
			onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
			variant="contained"
			disabled={!(coverImage && galleryName && galleryDescription)}
		>
			Next
		</Button>
	);

	const prevButton = (
		<Button
			className={classes.navigationButton}
			variant="contained"
			size="large"
			onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
		>
			Previous
		</Button>
	);

	const handleDropzoneSubmit = async (file) => {
		console.log(file);
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
			handleSubmit={handleDropzoneSubmit} // TODO
			handleChangeStatus={() => console.log("status changed")}
		/>
	);

	let stepComponents = [
		<AddGalleryMetadata
			nextButton={nextButton}
			fileUploader={dropzone}
			coverImage={coverImage}
			setCoverImage={setCoverImage}
			collectionName={galleryName}
			setGalleryName={setGalleryName}
			galleryDescription={galleryDescription}
			setGalleryDescription={setGalleryDescription}
		/>,
		<SelectGalleryNfts
			nextButton={nextButton}
			prevButton={prevButton}
			user={user}
			account={user.walletAddress}
			handleSubmit={handleSubmit}
		/>,
	];

	return (
		<>
			{stepComponents[activeStep]}
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
