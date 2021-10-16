import React from "react";

import {
	Container,
	Grid,
	Typography,
	Button,
	TextField,
	TextareaAutosize,
} from "@material-ui/core";

import ipfsHelper from "../../api/ipfsHelper";

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
	const handleSubmit = () => {
		console.log(ipfsHelper);
		const res = ipfsHelper.addNftMetadata(addedFileHash, {
			name: nftName,
			description: nftDescription,
		});
		setUploadedMetadata(res);
	};

	return (
		<Container>
			<Typography variant="h5">Add Information to your Art</Typography>
			{uploadedMetadata ? (
				<Container style={{ textAlign: "center" }}>
					<Typography variant="body2">Done!</Typography>
					{prevButton}
					{nextButton}
				</Container>
			) : (
				<Grid
					container
					spacing={2}
					alignContent="center"
					justify="center"
					alignItems="center"
				>
					<Grid item xs={12}>
						<TextField
							variant="outlined"
							placeholder="Name"
							value={nftName}
							onChange={(event) => setNftName(event.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextareaAutosize
							placeholder="Description"
							rowsMin={6}
							value={nftDescription}
							onChange={(event) => setNftDescription(event.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<Button
							color="primary"
							size="large"
							variant="outlined"
							onClick={() => handleSubmit()}
						>
							Create Metadata!
						</Button>
					</Grid>
				</Grid>
			)}
		</Container>
	);
}

export default AddMetadata;
