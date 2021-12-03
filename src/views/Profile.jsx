import React, { useEffect, useState } from "react";
import ProfileHeader from "../components/profile/ProfileHeader";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { fetchExistingUserWithId } from "../api/strapi";

const useStyles = makeStyles((theme) => ({
	mainContainer: {
		paddingTop: "4vh",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	galleriesContainer: {
		width: "85vw",
		boxShadow:
			"rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(63, 174, 223) 0px 0px 0px 5px",
		paddingTop: "2vw",
		paddingLeft: "5vw",
		paddingRight: "5vw",
		borderRadius: "2px",
		minHeight: "30vh",
		marginBottom: "5vh",
	},
	importButton: {
		display: "block",
		margin: "0 auto",
	},
	noGalleryFoundContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		width: "85vw",
		minHeight: "30vh",
		paddingBottom: "1vh",
		paddingTop: "2vh",
		boxShadow:
			"rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(63, 174, 223) 0px 0px 0px 5px",
	},
	createGalleryDescription: {
		fontSize: "20px",
		fontWeight: "lighter",
		letterSpacing: "1px",
		width: "60vw",
		marginBottom: "4vh",
	},
	createGalleryButton: {
		paddingTop: "2vh",
		paddingBottom: "2vh",
	},
	noGalleryFoundText: {
		fontSize: "20px",
		fontWeight: "lighter",
		letterSpacing: "1px",
	},
}));

const Profile = ({ user }) => {
	const classes = useStyles();
	const [profileOwner, setProfileOwner] = useState();

	let { userId } = useParams();

	// fetch profile with id from strapi
	// set to profileOwner if success
	// if failure ???
	useEffect(async () => {
		if (userId === user?.id) {
			setProfileOwner(user);
		} else {
			let response = await fetchExistingUserWithId(userId);
			if (response.status === 200) {
				setProfileOwner(response.data[0]);
			} else {
				console.log("FAIL");
			}
		}
	}, [userId]);

	const galleries = () => {
		return (
			<Grid container spacing={4} className={classes.galleriesContainer}>
				<p>Hello</p>
			</Grid>
		);
	};

	const noGalleryFoundCreateGallery = () => {
		return (
			<div className={classes.noGalleryFoundContainer}>
				<Typography
					className={classes.createGalleryDescription}
					variant="h6"
					component="h2"
				>
					Galleries are a great way to present your NFT portfolio to people!
					Create one by clicking the button below.
				</Typography>
				<Button
					component={Link}
					to="/create-gallery"
					variant={"outlined"}
					className={classes.createGalleryButton}
				>
					Create Gallery
				</Button>
			</div>
		);
	};

	const noGalleryFound = () => {
		return (
			<div className={classes.noGalleryFoundContainer}>
				<Typography
					className={classes.noGalleryFoundText}
					variant="h6"
					component="h2"
				>
					The user hasn't got any galleries yet
				</Typography>
			</div>
		);
	};

	return (
		<div className={classes.mainContainer}>
			<ProfileHeader ownProfile={userId === user?.id} profile={profileOwner} />
			{userId === user?.id
				? profileOwner?.galleries // TODO: fetch this from galleries
					? galleries()
					: noGalleryFoundCreateGallery()
				: profileOwner?.galleries
				? galleries()
				: noGalleryFound()}
		</div>
	);
};

export default Profile;
