import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button, Typography } from "@material-ui/core";

import IpfsUploader from "./IpfsUploader";

//TODO
const useStyles = makeStyles((theme) => ({
	root: {
		textAlign: "center",
	},
	title: {
		margin: 40,
	},
}));

function UploadArt({ addedFileHash, nextButton, onUploaded }) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			{addedFileHash ? (
				<Container>
					<Typography className={classes.title} variant="body1">
						Uploaded: {addedFileHash}
					</Typography>
					{nextButton}
				</Container>
			) : (
				<Container>
					<Typography className={classes.title} variant="h5">
						Upload your Art
					</Typography>
					<IpfsUploader onUploaded={onUploaded} />
				</Container>
			)}
		</div>
	);
}

export default UploadArt;
