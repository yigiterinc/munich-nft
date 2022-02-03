import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import FileDropzone from "../components/common/FileDropzone";
import AddGalleryMetadata from "../components/create-gallery/AddGalleryMetadata";

import { darken, makeStyles } from "@material-ui/core/styles";
import {
	convertSelectedNftsToGalleryAssets,
	createGallery,
	uploadImageToMediaGallery,
} from "../api/strapi";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { getLoggedInUser, isUserLoggedIn } from "../utils/auth-utils";
import { useHistory } from "react-router-dom";
import ImportFromOpensea from "../components/create-gallery/ImportFromOpensea";
import ImportFromContract from "../components/create-gallery/ImportFromContract";
import ImportFromPhantomWallet from "../components/create-gallery/ImportFromPhantomWallet";

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
	const [activeStep, setActiveStep] = useState(0);
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [importMethod, setImportMethod] = useState("OPENSEA");
	const [contractAddress, setContractAddress] = useState();

	const user = getLoggedInUser();

	const history = useHistory();
	const classes = useStyles();

	const handleSubmit = async (selectedItems) => {
		let selectedItemsAreEthNft = selectedItems.hasOwnProperty("nft"); // and not collection
		if (!isUserLoggedIn()) {
			history.push("/");
			return;
		}

		const allRequiredParamsEntered =
			galleryName && galleryDescription && coverImage && selectedItems;

		if (!user || !allRequiredParamsEntered) {
			setError(true);
			return;
		}

		let assets = selectedItems;
		if (selectedItemsAreEthNft) {
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
			username: user.username,
		};

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

	const convertToSlug = (galleryName) => {
		return galleryName.toLowerCase().replaceAll(" ", "_");
	};

	const IMPORT_METHODS = {
		OPENSEA: "Opensea",
		CUSTOM_CONTRACT: "Ethereum Contract",
		SOLANA_WALLET: "Phantom Wallet",
	};

	let ImportComponents = {
		OPENSEA: (
			<ImportFromOpensea
				prevButton={props.prevButton}
				handleSubmit={handleSubmit}
			/>
		),
		CUSTOM_CONTRACT: (
			<ImportFromContract
				prevButton={props.prevButton}
				handleSubmit={handleSubmit}
				contractAddress={contractAddress}
			/>
		),
		SOLANA_WALLET: (
			<ImportFromPhantomWallet
				prevButton={props.prevButton}
				handleSubmit={handleSubmit}
			/>
		),
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
			handleSubmit={handleDropzoneSubmit} // TODO
			handleChangeStatus={() => console.log("status changed")}
		/>
	);

	const ActiveStep = () => {
		const steps = [
			<AddGalleryMetadata
				nextButton={nextButton}
				fileUploader={dropzone}
				coverImage={coverImage}
				setCoverImage={setCoverImage}
				collectionName={galleryName}
				setGalleryName={setGalleryName}
				galleryDescription={galleryDescription}
				setGalleryDescription={setGalleryDescription}
				importMethod={importMethod}
				importMethods={IMPORT_METHODS}
				setImportMethod={setImportMethod}
				contractAddress={contractAddress}
				setContractAddress={setContractAddress}
			/>,
			ImportComponents[importMethod],
		];

		return steps[activeStep];
	};

	return (
		<>
			{ActiveStep()}
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
