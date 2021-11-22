import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
	propertyBox: {
		width: "150px",
		backgroundColor: "rgba(220, 94, 132, 0.06)",
		borderRadius: "6px",
		border: "1px solid rgb(230,46,132)",
		padding: "10px",
		textAlign: "center",
	},
	propertyType: {
		color: "rgb(255, 0, 117)",
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
		textTransform: "capitalize",
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
	let sorted = nftJson.properties.sort(
		(a, b) => (a.trait_type > b.trait_type && 1) || -1
	);
	let properties = customPropertiesHelper(sorted, nftJson.collectionSize);

	return <>{renderProperties(classes, properties)}</>;
};

export const renderProperties = (classes, properties) => {
	return (
		<Grid container spacing={1} justifyContent="flex-start">
			{renderGrids(classes, properties)}
		</Grid>
	);
};

export const renderGrids = (classes, properties) => {
	const col = 3;
	const row = [];
	for (let i = 0; i < properties.length; i += col) {
		row.push(
			<Grid container item xs={12} spacing={3} key={i}>
				{renderRows(classes, properties.slice(i, i + col))}
			</Grid>
		);
	}
	return row;
};

export const renderRows = (classes, properties) => {
	return (
		<>
			{properties.map((property, key) => {
				return (
					<Grid item xs={4} key={key}>
						<div className={classes.propertyBox}>
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
