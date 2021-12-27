import React, { useEffect, useState } from "react";
import { makeStyles, MenuItem, Select, Typography } from "@material-ui/core";
import { MunichNftContractAddress } from "../../config/config";

import { fetchUserCollections } from "../../api/strapi";

const useStyles = makeStyles((theme) => ({
	mainContainer: {
		width: "60vw",
		textAlign: "center",
		margin: "auto",
	},
	description: {
		fontSize: "18px",
	},
	selectContainer: {
		width: "200px",
		margin: "auto",
	},
	collectionPicker: {
		padding: "5px 20px",
		fontSize: "18px",
		display: "block",
		marginTop: "20px",
		marginBottom: "20px",
	},
}));

const defaultContractAddress = MunichNftContractAddress;

function MintingMethodSelect({
	mintTargetCollection,
	setMintTargetCollection,
	setMintTargetCollectionAddress,
	nextButton,
	account,
}) {
	const classes = useStyles();

	const [collectionSelectOptions, setCollectionSelectOptions] = useState([
		{ name: "Default Collection", address: defaultContractAddress },
	]);

	useEffect(() => {
		const existingCollections = fetchUserCollections(account);
		const updatedOptions = [collectionSelectOptions[0], ...existingCollections];
		setCollectionSelectOptions(updatedOptions);
	}, []);

	const handleOptionChange = (value) => {
		setMintTargetCollection(value);
		console.log(
			collectionSelectOptions.filter((el) => el.name === value)[0]?.address
		);
		setMintTargetCollectionAddress(
			collectionSelectOptions.filter((el) => el.name === value)[0]?.address
		);
	};

	const collectionPicker = () => {
		return (
			<div className={classes.selectContainer}>
				<Select
					labelId="demo-customized-select-label"
					id="demo-customized-select"
					value={mintTargetCollection}
					onChange={(event) => handleOptionChange(event.target.value)}
					className={classes.collectionPicker}
				>
					{collectionSelectOptions.map((option) => {
						return (
							<MenuItem value={option.name} key={option.address}>
								{option.name}
							</MenuItem>
						);
					})}
				</Select>
			</div>
		);
	};

	return (
		<div className={classes.mainContainer}>
			<Typography className={classes.description}>
				Each NFT belongs in a collection, please select the collection to
				contain this NFT. You can create a new collection in your profile to
				mint to that or just mint in the default collection if you are not sure.
			</Typography>
			{collectionPicker()}
			{nextButton}
		</div>
	);
}

export default MintingMethodSelect;
