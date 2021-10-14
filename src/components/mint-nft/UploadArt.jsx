import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button, Typography } from "@material-ui/core";

import IpfsUploader from "./IpfsUploader";

const useStyles = makeStyles((theme) => ({
	root: {
		textAlign: "center",
	},
}));

function UploadArt({
	fileUploadResult,
	nextButton,
	setIpfsDialogOpen,
	onUploaded,
}) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<h1>Upload</h1>
			{fileUploadResult === null ? (
				<Container>
					<Typography variant="h5">Upload your Art</Typography>
					<IpfsUploader
						onUploaded={onUploaded}
						closeDialog={() => setIpfsDialogOpen(false)}
						openDialog={() => setIpfsDialogOpen(true)}
					/>
				</Container>
			) : (
				<Container style={{ textAlign: "center" }}>
					<Typography variant="body2">Uploaded: {fileUploadResult}</Typography>
					{nextButton}
				</Container>
			)}
		</div>
	);
}

export default UploadArt;
