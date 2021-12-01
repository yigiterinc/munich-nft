import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import FileDropzone from "../components/common/FileDropzone";
import AddGalleryMetadata from "../components/create-gallery/AddGalleryMetadata";
import SelectGalleryNfts from "../components/create-gallery/SelectGalleryNfts";

import { makeStyles } from "@material-ui/core/styles";

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
	const [collectionName, setCollectionName] = useState();
	const [collectionDescription, setCollectionDescription] = useState();
	const [coverImage, setCoverImage] = useState();
	const [activeStep, setActiveStep] = useState(0);

	const classes = useStyles();

	const handleSubmit = (selectedCollections, selectedNfts) => {
		console.log(selectedNfts, selectedCollections);
	};

	const nextButton = (
		<Button
			className={classes.navigationButton}
			size="large"
			onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
			variant="contained"
			disabled={!(coverImage && collectionName && collectionDescription)}
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
												collectionName={collectionName}
												setCollectionName={setCollectionName}
												collectionDescription={collectionDescription}
												setCollectionDescription={setCollectionDescription}
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
