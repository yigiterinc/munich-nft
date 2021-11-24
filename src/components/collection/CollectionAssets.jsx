import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import AssetCard from "../common/AssetCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({}));

const CollectionHeader = ({ collection, assets }) => {
	const classes = useStyles();

	return (
		<>
			{assets &&
				assets?.map((asset) => {
					return (
						<Grid key={asset.id} item xs={12} sm={6} md={4} lg={3}>
							<AssetCard asset={asset} />
						</Grid>
					);
				})}
		</>
	);
};

export default CollectionHeader;
