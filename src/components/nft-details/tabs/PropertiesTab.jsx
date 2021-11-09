import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
	propertyContainer: {
		width: "110px",
		backgroundColor: "rgba(21, 178, 229, 0.06)",
		borderRadius: "6px",
		border: "1px solid rgb(21, 178, 229)",
		padding: "10px",
		textAlign: "center",
	},
	propertyType: {
		color: "rgb(21, 178, 229)",
		textTransform: "uppercase",
	},
	typeText: {
		fontSize: "12px",
		fontWeight: "500",
		overflow: "hidden",
		whiteSpace: "nowrap",
		textOverflow: "ellipsis",
	},
	propertyValue: {
		color: "rgb(53, 56, 64)",
		fontSize: "13px",
		fontWeight: "500",
		lineHeight: "28px",
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
	},
	propertyRarity: {
		color: "rgb(112, 122, 131)",
		fontSize: "12px",
		lineHeight: "16px",
		minHeight: "16px",
	},
});

const PropertiesTab = (nftJson) => {
	const classes = useStyles();
	let properties = null;

	if (nftJson.properties !== null) {
		properties = customPropertiesHelper(
			nftJson.properties,
			nftJson.collectionSize
		);
	}

	return (
		<>
			{properties.length === 0 ? (
				<div>
					<Typography component="span">It has no properties</Typography>
				</div>
			) : (
				renderProperties(classes, properties)
			)}
		</>
	);
};

export const renderProperties = (classes, properties) => {
	return (
		<>
			<Grid container spacing={1}>
				{renderGrids(classes, properties)}
			</Grid>
		</>
	);
};

export const renderGrids = (classes, properties) => {
	const row = [];
	for (let i = 0; i < properties.length; i += 3) {
		row.push(
			<Grid container item xs={12} spacing={3}>
				{renderRows(classes, properties.slice(i, i + 3))}
			</Grid>
		);
	}
	return row;
};

export const renderRows = (classes, properties) => {
	return (
		<>
			{properties.map((property) => {
				return (
					<Grid item xs={4}>
						<div className={classes.propertyContainer}>
							<div className={classes.propertyType}>
								<Typography className={classes.typeText}>
									{property.type}
								</Typography>
							</div>
							<div className={classes.propertyValue}>{property.value}</div>
							<div className={classes.propertyRarity}>
								{"Rarity: " + property.rarity}
							</div>
						</div>
					</Grid>
				);
			})}
		</>
	);
};

export const customPropertiesHelper = (traits, collectionSize) => {
	let properties = [];
	traits.forEach((trait) => {
		if (trait.value !== 0) {
			if (trait.trait_count !== 0) {
				const type = trait.trait_type;
				const value = trait.value;
				const rarity =
					((trait.trait_count / collectionSize) * 100).toFixed(1) + "%";

				properties.push({ type, value, rarity });
			}
		}
	});
	return properties;
};

export default PropertiesTab;
