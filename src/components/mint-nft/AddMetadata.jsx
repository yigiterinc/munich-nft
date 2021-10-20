import React from "react";

import {
	Container,
	Grid,
	Typography,
	Button,
	TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ipfsHelper from "../../api/ipfsHelper";

const useStyles = makeStyles((theme) => ({
	root: {
		textAlign: "center",
	},
	title: {
		margin: 40,
	},
	textField: {
		width: 400,
		maxWidth: "100%",
	},
	button: {
		marginTop: 20,
	},
}));

function AddMetadata({
	nextButton,
	prevButton,
	addedFileHash,
	uploadedMetadata,
	setUploadedMetadata,
	nftName,
	nftDescription,
	setNftDescription,
	setNftName,
}) {
	const classes = useStyles();

	const handleSubmit = () => {
		console.log(ipfsHelper);
		const res = ipfsHelper.addNftMetadata(addedFileHash, {
			name: nftName,
			description: nftDescription,
		});
		setUploadedMetadata(res);
	};

	return (
		<div className={classes.root}>
			{uploadedMetadata ? (
				<Container>
					<Typography className={classes.title} variant="body1">
						Done!
					</Typography>
					{prevButton}
					{nextButton}
				</Container>
			) : (
				<Container>
					<Typography className={classes.title} variant="h5">
						Add Information to your Art
					</Typography>
					<Grid container spacing={2} direction="column" alignContent="center">
						<Grid item xs={12}>
							<TextField
								className={classes.textField}
								variant="outlined"
								placeholder="Name"
								fullWidth
								value={nftName}
								onChange={(event) => setNftName(event.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								className={classes.textField}
								variant="outlined"
								placeholder="Description"
								fullWidth
								multiline
								rows={6}
								value={nftDescription}
								onChange={(event) => setNftDescription(event.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button
								className={classes.button}
								color="primary"
								size="large"
								variant="outlined"
								onClick={() => handleSubmit()}
							>
								Create Metadata!
							</Button>
						</Grid>
					</Grid>
				</Container>
			)}
		</div>
	);
}

export default AddMetadata;
