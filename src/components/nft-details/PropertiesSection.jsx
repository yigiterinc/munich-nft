import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
	properties: {
		display: "flex",
		marginTop: "-8px",
		width: "calc(100% + 8px)",
		marginLeft: "-8px",
		marginBottom: "-15px",
		flexFlow: "row wrap",
	},
	noPropertyContainer: {
		display: "flex",
		marginTop: "-8px",
		width: "calc(100% + 8px)",
		verticalAlign: "center",
		textAlign: "center",
		marginBottom: "-15px",
		flexFlow: "row wrap",
	},
	noPropertyText: {
		lineHeight: "60px",
		marginTop: "-16px",
	},
	propertyBox: {
		justifyContent: "center",
		textAlign: "center",
		marginRight: "12.5px",
		marginBottom: "10px",
		display: "inline-flex",
		backgroundColor: "rgb(25, 44, 48)",
		borderRadius: "40px",
		whiteSpace: "nowrap",
		border: "1.5px solid transparent",
		color: "rgb(255, 255, 255)",
		padding: "8px 12px",
		fontSize: "14px",
	},
});

const PropertiesSection = (nftJson) => {
	const classes = useStyles();

	let traits = nftJson.properties;
	let sorted;
	let properties = null;

	if (traits.length > 0) {
		sorted = traits.sort((a, b) => (a.trait_type > b.trait_type && 1) || -1);
		properties = customPropertiesHelper(sorted, nftJson.collectionSize);
	}

	return <>{renderProperties(classes, properties)}</>;
};

export const renderProperties = (classes, properties) => {
	return (
		<>
			{properties === null ? (
				<div className={classes.noPropertyContainer}>
					<Typography className={classes.noPropertyText}>
						<b>This NFT has not any properties </b>
					</Typography>
				</div>
			) : (
				<Grid
					container
					justifyContent="flex-start"
					className={classes.properties}
				>
					{properties.map((property, key) => {
						if (property.rarity === "0.0%") {
							property.rarity = "New trait";
						}
						return (
							<Grid item key={key}>
								<div className={classes.propertyBox}>
									<Typography>
										{property.type}
										{": "} {property.value} {"("}
										{property.rarity}
										{")"}
									</Typography>
								</div>
							</Grid>
						);
					})}
				</Grid>
			)}
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
