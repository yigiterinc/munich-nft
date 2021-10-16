import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button, Typography } from "@material-ui/core";

import IpfsUploader from "./IpfsUploader";

//TODO
const useStyles = makeStyles((theme) => ({
	root: {
		textAlign: "center",
	},
}));

function UploadArt({ addedFileHash, nextButton, onUploaded }) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<h1>Upload</h1>
			{addedFileHash ? (
				<Container style={{ textAlign: "center" }}>
					<Typography variant="body2">Uploaded: {addedFileHash}</Typography>
					{nextButton}
				</Container>
			) : (
				<Container>
					<Typography variant="h5">Upload your Art</Typography>
					<IpfsUploader onUploaded={onUploaded} />
				</Container>
			)}
		</div>
	);
}

export default UploadArt;
