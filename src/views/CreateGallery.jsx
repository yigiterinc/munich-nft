import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import FileDropzone from "../components/common/FileDropzone";
import AddGalleryMetadata from "../components/create-gallery/AddGalleryMetadata";
import SelectGalleryNfts from "../components/create-gallery/SelectGalleryNfts";

const CreateGallery = (props) => {
	const [collectionName, setCollectionName] = useState();
	const [collectionDescription, setCollectionDescription] = useState();
	const [coverImage, setCoverImage] = useState();

	const [activeStep, setActiveStep] = useState(0);

	const nextButton = (
		<Button
			style={{
				background: "#FF6700",
				color: "#FFFFFF",
				margin: "13px 25px",
				padding: "13px 25px",
			}}
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
			style={{
				background: "#FF6700",
				color: "#FFFFFF",
				margin: "10px 20px",
				padding: "10px 20px",
			}}
			variant="contained"
			size="large"
			onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
		>
			Previous
		</Button>
	);

	const submitButton = (
		<Button
			style={{
				background: "#FF6700",
				color: "#FFFFFF",
				margin: "10px 20px",
				padding: "10px 20px",
			}}
			color="primary"
			size="large"
			onClick={() => handleSubmit()}
			variant="outlined"
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
											 submitButton={submitButton}
											 user={props.user}
											 account={props.account} />,
	];

	const handleSubmit = () => {
		// TODO
	};

	return (
		stepComponents[activeStep]
	);
};

export default CreateGallery;
