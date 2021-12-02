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

const useStyles = makeStyles((theme) => ({
	navigationButton: {
		background: "#FF6700",
		color: "#FFFFFF",
		margin: "13px 25px",
		padding: "13px 25px",
		"&:disabled": {
			opacity: "80%"
		},
		"&:hover": {
			background: darken("#FF6700", 0.1)
		}
	},
}));

const CreateGallery = (props) => {
	const [galleryName, setGalleryName] = useState();
	const [galleryDescription, setGalleryDescription] = useState();
	const [coverImage, setCoverImage] = useState();
	const [activeStep, setActiveStep] = useState(0);
	const [error, setError] = useState(false)

	const classes = useStyles();

	const handleSubmit = async (selectedCollections, selectedNfts) => {
		let user = props?.user
		const allRequiredParamsEntered = galleryName &&
			galleryDescription &&
			coverImage &&
			(selectedCollections || selectedNfts)

		if (!user || !allRequiredParamsEntered) {
			setError(true)
			return;
		}

		let assets;
		if (selectedNfts) {
			assets = convertSelectedNftsToGalleryAssets(selectedNfts)
		} else if (selectedCollections) {
			assets = selectedCollections;
		} else {
			return;
		}

		const uploadResult = await uploadImageToMediaGallery(coverImage);
		const imageIdentifier = uploadResult.data[0]
		const gallery = {
			galleryName,
			description: galleryDescription,
			slug: convertToSlug(galleryName),
			coverImage: imageIdentifier,
			assets: assets,
			userId: user.id
		};

		console.log(gallery);

		const updateResult = await createGallery(gallery)
		console.log(updateResult);
	};

	const convertToSlug = (galleryName) => {
		return galleryName.toLowerCase().replaceAll(" ", "_");
	}

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
		<FileDropzone dropzoneStyles={{ minWidth: "40vw", minHeight: "30vh", textAlign: "center" }}
									text="Click or drag to upload a cover image"
									handleSubmit={handleDropzoneSubmit} // TODO
									handleChangeStatus={() => console.log("status changed")} />
	);


	let stepComponents = [
		<AddGalleryMetadata nextButton={nextButton}
												fileUploader={dropzone}
												coverImage={coverImage}
												setCoverImage={setCoverImage}
												collectionName={galleryName}
												setGalleryName={setGalleryName}
												galleryDescription={galleryDescription}
												setGalleryDescription={setGalleryDescription}
		/>,
		<SelectGalleryNfts nextButton={nextButton}
											 prevButton={prevButton}
											 user={props.user}
											 account={props.account}
											 handleSubmit={handleSubmit}/>,
	];


	return (
		stepComponents[activeStep]
	);
};

export default CreateGallery;
