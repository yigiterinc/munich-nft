import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import FileDropzone from "../components/common/FileDropzone";
import AddGalleryMetadata from "../components/create-gallery/AddGalleryMetadata";

import { darken, makeStyles } from "@material-ui/core/styles";
import { convertSelectedNftsToGalleryAssets, createGallery, uploadImageToMediaGallery } from "../api/strapi";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { getLoggedInUser, isUserLoggedIn } from "../utils/auth-utils";
import { useHistory } from "react-router-dom";
import { MunichNftContractAddress } from "../config/config";
import ImportFromOpensea from "../components/create-gallery/ImportFromOpensea";
import ImportFromContract from "../components/create-gallery/ImportFromContract";

const Alert = (props) => {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme) => ({
	navigationButton: {
		background: "#FF6700",
		color: "#FFFFFF",
		margin: "13px 25px",
		padding: "13px 25px",
		"&:disabled": {
			opacity: "80%",
		},
		"&:hover": {
			background: darken("#FF6700", 0.1),
		},
	},
}));

const IMPORT_METHODS = {
	OPENSEA: "OPENSEA",
	CUSTOM_CONTRACT: "CUSTOM_CONTRACT",
};

const CreateGallery = (props) => {
	const [galleryName, setGalleryName] = useState();
	const [galleryDescription, setGalleryDescription] = useState();
	const [coverImage, setCoverImage] = useState();
	const [activeStep, setActiveStep] = useState(0);
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [importMethod, setImportMethod] = useState(IMPORT_METHODS.CUSTOM_CONTRACT);
	const [contractAddress, setContractAddress] = useState();

	const history = useHistory();

	const classes = useStyles();

	const handleSubmit = async (selectedItems) => {
		console.log(selectedItems);
		return;
		let selectedItemsAreNft = selectedItems.hasOwnProperty("nft");	// and not collection
		if (!isUserLoggedIn()) {
			history.push("/");
			return;
		}

		let user = getLoggedInUser();
		const allRequiredParamsEntered = galleryName &&
			galleryDescription &&
			coverImage &&
			selectedItems;

		if (!user || !allRequiredParamsEntered) {
			setError(true);
			return;
		}

		let assets = selectedItems;
		if (selectedItemsAreNft) {
			assets = convertSelectedNftsToGalleryAssets(selectedItems);
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
		};

		const updateResult = await createGallery(gallery);
		if (updateResult.status === 200) {
			setSuccess(true);
			const twoSecondsInMS = 2000;
			redirectAfterDelay(`/gallery/${convertToSlug(galleryName)}`, twoSecondsInMS);
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
		<FileDropzone dropzoneStyles={{ minWidth: "40vw", minHeight: "30vh", textAlign: "center" }}
									text="Click or drag to upload a cover image"
									handleSubmit={handleDropzoneSubmit} // TODO
									handleChangeStatus={() => console.log("status changed")} />
	);

	const ActiveStep = () => {
		const steps = [<AddGalleryMetadata nextButton={nextButton}
																			 fileUploader={dropzone}
																			 coverImage={coverImage}
																			 setCoverImage={setCoverImage}
																			 collectionName={galleryName}
																			 setGalleryName={setGalleryName}
																			 galleryDescription={galleryDescription}
																			 setGalleryDescription={setGalleryDescription}
																			 importMethod={importMethod}
																			 setImportMethod={setImportMethod}
																			 contractAddress={contractAddress}
																			 setContractAddress={setContractAddress}
		/>];

		let importComponent = importMethod === IMPORT_METHODS.OPENSEA ?
			<ImportFromOpensea prevButton={props.prevButton}
												 handleSubmit={props.handleSubmit} />
			:
			<ImportFromContract prevButton={props.prevButton}
													handleSubmit={props.handleSubmit} />;

		steps.push(importComponent);

		return steps[activeStep];
	};

	let stepComponents = [
		<AddGalleryMetadata nextButton={nextButton}
												fileUploader={dropzone}
												coverImage={coverImage}
												setCoverImage={setCoverImage}
												collectionName={galleryName}
												setGalleryName={setGalleryName}
												galleryDescription={galleryDescription}
												setGalleryDescription={setGalleryDescription}
												importMethod={importMethod}
												setImportMethod={setImportMethod}
		/>,
		<ImportFromContract prevButton={prevButton}
												handleSubmit={handleSubmit}
												contractAddress={MunichNftContractAddress} />,
	];


	return (
		<>
			{
				stepComponents[1]
			}
			<Snackbar open={success} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} autoHideDuration={3000}
								onClose={() => setSuccess(false)}>
				<Alert severity="success" onClose={() => setSuccess(false)}>
					Your gallery is successfully created
				</Alert>
			</Snackbar>
			<Snackbar open={error} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} onClose={() => setError(false)}>
				<Alert severity="error" onClose={() => setError(false)}>
					An error occurred :(
				</Alert>
			</Snackbar>
		</>
	);
};

export default CreateGallery;
