import React from "react";

import { Button, Container, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ipfsHelper from "../../api/ipfsHelper";

const useStyles = makeStyles((theme) => ({
	root: {
		textAlign: "center",
	},
	title: {
		margin: 30,
		marginBottom: "2vh",
		letterSpacing: "1px",
	},
	info: {
		fontSize: "18px",
		marginTop: "2vh",
		marginBottom: "3vh",
		letterSpacing: "1px",
	},
	completed: {
		margin: 30,
		marginBottom: "2vh",
		letterSpacing: "1px",
		fontSize: "20px",
	},
	textField: {
		width: 400,
		maxWidth: "100%",
	},
	button: {
		marginTop: 20,
		padding: "10px 20px",
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

	const handleSubmit = async () => {
		const res = await ipfsHelper.addNftMetadata(addedFileHash, {
			name: nftName,
			description: nftDescription,
		});
		setUploadedMetadata(res);
	};

	const createMetadataButton = () => {
		return (
			<Button
				className={classes.button}
				color="primary"
				size="large"
				variant="outlined"
				onClick={() => handleSubmit()}
			>
				Create Metadata!
			</Button>
		);
	};

	const renderResult = () => {
		return (
			<Container>
				<Typography className={classes.completed} variant="body1">
					Done!
				</Typography>
				{prevButton}
				{nextButton}
			</Container>
		);
	};

	const addMetadataFormComponents = [
		<TextField
			className={classes.textField}
			variant="outlined"
			placeholder="Name"
			fullWidth
			value={nftName}
			onChange={(event) => setNftName(event.target.value)}
		/>,
		<TextField
			className={classes.textField}
			variant="outlined"
			placeholder="Description"
			fullWidth
			multiline
			rows={6}
			value={nftDescription}
			onChange={(event) => setNftDescription(event.target.value)}
		/>,
		createMetadataButton(),
	];

	const renderUploadPrompt = () => {
		return (
			<Container>
				<Typography className={classes.title} variant="h5">
					Add Information to your Art
				</Typography>
				<Typography className={classes.info} variant="body1">
					Please enter a name and description for your art
				</Typography>
				<Grid container spacing={2} direction="column" alignContent="center">
					{addMetadataFormComponents.map((component, index) => {
						return (
							<Grid item xs={12} key={index}>
								{component}
							</Grid>
						);
					})}
				</Grid>
			</Container>
		);
	};

	return (
		<div className={classes.root}>
			{uploadedMetadata ? renderResult() : renderUploadPrompt()}
		</div>
	);
}

export default AddMetadata;
