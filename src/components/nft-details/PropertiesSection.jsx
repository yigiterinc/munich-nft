import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
	properties: {
		paddingTop: "4vh",
		paddingBottom: "4vh",
	},
	propertyBox: {
		backgroundColor: "rgba(220, 94, 132, 0.06)",
		borderRadius: "6px",
		border: "1px solid rgb(230,46,132)",
		padding: "8px",
		textAlign: "center",
	},
	propertyType: {
		color: "rgb(255, 0, 117)",
		textTransform: "uppercase",
		fontSize: "13px",
		fontWeight: "500",
		overflow: "hidden",
		whiteSpace: "nowrap",
		textOverflow: "ellipsis",
	},
	propertyValue: {
		color: "rgb(53, 56, 64)",
		fontSize: "14px",
		fontWeight: "500",
		lineHeight: "26px",
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
		textTransform: "capitalize",
	},
	propertyRarity: {
		color: "rgb(112, 122, 131)",
		fontSize: "14px",
		lineHeight: "16px",
		minHeight: "16px",
	},
});

const PropertiesSection = (nftJson) => {
	const classes = useStyles();
	let sorted = nftJson.properties.sort(
		(a, b) => (a.trait_type > b.trait_type && 1) || -1
	);
	let properties = customPropertiesHelper(sorted, nftJson.collectionSize);

	return <>{renderProperties(classes, properties)}</>;
};

export const renderProperties = (classes, properties) => {
	return (
		<>
			<Grid xs={1} />
			<Grid
				container
				spacing={2}
				justifyContent="flex-start"
				className={classes.properties}
				xs={10}
			>
				{properties.map((property, key) => {
					return (
						<Grid item xs={3} key={key}>
							<div className={classes.propertyBox}>
								<Typography className={classes.propertyType}>
									{property.type}
								</Typography>
								<Typography className={classes.propertyValue}>
									{property.value}
								</Typography>
								{property.rarity && (
									<Typography className={classes.propertyRarity}>
										{"Rarity: " + property.rarity}
									</Typography>
								)}
							</div>
						</Grid>
					);
				})}
			</Grid>
			<Grid xs={1} />
		</>
	);
};

export const customPropertiesHelper = (traits, collectionSize) => {
	let properties = [];
	traits.forEach((trait) => {
		if (trait.value !== 0) {
			const type = trait.trait_type;
			const value = trait.value;
			if (collectionSize) {
				const rarity =
					((trait.trait_count / collectionSize) * 100).toFixed(1) + "%";
				properties.push({ type, value, rarity });
			} else {
				properties.push({ type, value });
			}
		}
	});
	return properties;
};

export default PropertiesSection;
