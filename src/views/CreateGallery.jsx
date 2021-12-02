import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import FileDropzone from "../components/common/FileDropzone";
import AddGalleryMetadata from "../components/create-gallery/AddGalleryMetadata";
import SelectGalleryNfts from "../components/create-gallery/SelectGalleryNfts";

import { makeStyles } from "@material-ui/core/styles";
import { saveImportedNfts, updateUser, uploadImageToMediaGallery } from "../api/strapi";

const useStyles = makeStyles((theme) => ({
	navigationButton: {
		background: "#FF6700",
		color: "#FFFFFF",
		margin: "13px 25px",
		padding: "13px 25px",

		"&:disabled": {
			opacity: "80%"
		}
	},
}));

const CreateGallery = (props) => {
	const [galleryName, setGalleryName] = useState();
	const [galleryDescription, setGalleryDescription] = useState();
	const [coverImage, setCoverImage] = useState();
	const [activeStep, setActiveStep] = useState(0);

	const classes = useStyles();

	const handleSubmit = async (selectedCollections, selectedNfts) => {
		let user = props?.user
		if (!user) {
			console.log("user undefined");
			return;
		}

		let assets;
		if (selectedNfts) {
			assets = await saveImportedNfts(user, selectedNfts)
		} else if (selectedCollections) {
			assets = selectedCollections;
		} else {
			return;
		}

		const uploadResult = await uploadImageToMediaGallery(coverImage);
		const imageIdentifier = uploadResult.data[0]
		const gallery = {
			galleryName,
			galleryDescription,
			coverImage: imageIdentifier,
			assets: assets
		};

		if (user.galleries) {
			props.user.galleries.push(gallery)
		} else {
			user.galleries = [gallery]
		}

		const updateResult = await updateUser(props.user)
		console.log(updateResult);
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
												setCollectionName={setGalleryName}
												collectionDescription={galleryDescription}
												setCollectionDescription={setGalleryDescription}
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
