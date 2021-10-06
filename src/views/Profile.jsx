import React from "react";
import AssetCard from "../components/profile/AssetCard";
import Header from "../components/profile/Header";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import dummyAssets from "../dummy/dummyAssets.json";
import dummyProfile from "../dummy/dummyProfile.json";

const useStyles = makeStyles((theme) => ({
	gridContainer: {
		paddingTop: "3vw",
		paddingLeft: "10vw",
		paddingRight: "10vw",
	},
}));

const Profile = () => {
	const classes = useStyles();

	return (
		<Grid container spacing={4} className={classes.gridContainer}>
			<Grid item xs={12}>
				<Header profile={dummyProfile} />
			</Grid>
			{dummyAssets.map((item) => {
				return (
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<AssetCard asset={item} />
					</Grid>
				);
			})}
		</Grid>
	);
};

export default Profile;
