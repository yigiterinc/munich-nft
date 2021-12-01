import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";

import IpfsUploader from "./IpfsUploader";
import withSpinner from "../common/WithSpinner";

const useStyles = makeStyles((theme) => ({
	root: {
		textAlign: "center",
	},
	title: {
		margin: 30,
		fontSize: 20,
		lineHeight: "150%",
		letterSpacing: "1px",
	},
	uploadArtTitle: {
		margin: 40,
		fontSize: 24,
		lineHeight: "150%",
		letterSpacing: "1px",
	},
	ipfsUrl: {
		textDecoration: "inherit",
	},
	textContainer: {
		width: "70vh",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	addedFileHash: {
		marginTop: "2vh",
	},
}));

function UploadArt({ addedFileHash, nextButton, setAddedFileHash }) {
	const classes = useStyles();

	const [uploading, setUploading] = useState(false);

	const getIpfsUrl = () => {
		return `https://ipfs.io/ipfs/${addedFileHash}`;
	};

	const onUploaded = (path) => {
		setAddedFileHash(path);
		setUploading(false);
	};

	const renderUploadResult = () => {
		return (
			<Container className={classes.textContainer}>
				<Typography className={classes.title} variant="body1">
					Your file is successfully uploaded to IPFS with the following hash:{" "}
					<div className={classes.addedFileHash}>{addedFileHash}</div>
				</Typography>
				<Typography className={classes.title} variant="body1">
					You can view it{" "}
					<a href={getIpfsUrl()} className={classes.ipfsUrl}>
						here on IPFS
					</a>
				</Typography>
				<div className={classes.nextButton}>{nextButton}</div>
			</Container>
		);
	};

	const renderUploadPrompt = () => {
		return (
			<Container>
				<Typography className={classes.uploadArtTitle} variant="h5">
					Upload your Art
				</Typography>
				<IpfsUploader
					onUploadStart={() => setUploading(true)}
					onUploaded={onUploaded}
					dropzoneStyles={{minHeight: 200, maxHeight: 250, maxWidth: "60vw", textAlign: "center"}}
				/>
			</Container>
		);
	};

	const getRenderContent = () => {
		if (addedFileHash) {
			return renderUploadResult();
		} else {
			return withSpinner(renderUploadPrompt(), uploading, {
				justifyContent: "center",
				marginTop: "6vh"})
		}
	};

	return <div className={classes.root}>{getRenderContent()}</div>;
}

export default UploadArt;
