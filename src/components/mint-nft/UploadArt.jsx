import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Container,
	Box,
	Typography,
	CircularProgress,
} from "@material-ui/core";

import IpfsUploader from "./IpfsUploader";

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
	progress: {
		display: "flex",
		justifyContent: "center",
		marginTop: "6vh",
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
				/>
			</Container>
		);
	};

	const renderSpinner = () => {
		return (
			<Box className={classes.progress}>
				<CircularProgress />
			</Box>
		);
	};

	const getRenderContent = () => {
		if (addedFileHash) {
			return renderUploadResult();
		} else if (uploading) {
			return renderSpinner();
		} else {
			return renderUploadPrompt();
		}
	};

	return <div className={classes.root}>{getRenderContent()}</div>;
}

export default UploadArt;
