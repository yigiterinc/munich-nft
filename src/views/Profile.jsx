import React, { useEffect, useState } from "react";
import ProfileHeader from "../components/profile/ProfileHeader";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { fetchExistingUserWithId, fetchUserGalleries } from "../api/strapi";

const useStyles = makeStyles((theme) => ({
	mainContainer: {
		paddingTop: "4vh",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	galleriesContainer: {
		paddingLeft: "5vw",
		paddingRight: "5vw",
		borderRadius: "2px",
		marginBottom: "5vh",
		width: "85vw",
		minHeight: "30vh",
		paddingBottom: "1vh",
		boxShadow:
			"rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(63, 174, 223) 0px 0px 0px 5px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
	},
	importButton: {
		display: "block",
		margin: "0 auto",
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
	const [profileOwnerGalleries, setProfileOwnerGalleries] = useState(null);
	const [viewingOwnProfile, setViewingOwnProfile] = useState(false);

	let { userId: userIdParam } = useParams();

	useEffect(async () => {
		if (userIdParam === user?.id) {
			setProfileOwner(user);
			setViewingOwnProfile(true)
		} else {
			let response = await fetchExistingUserWithId(userIdParam);
			if (response.status === 200) {
				setProfileOwner(response.data[0]);
			} else {
				console.log("Failed to fetch user data");
			}
		}

		setProfileOwnerGalleries(await fetchUserGalleries());
	}, [userIdParam]);

	const Galleries = () => {
		console.log("galleries");
		return (
			<p>Hello</p>
		);
	};

	const NoGalleryFoundCreateGallery = () => {
		return (
			<>
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
			</>
		);
	};

	const NoGalleryFound = () => {
		return (
			<Typography
				className={classes.noGalleryFoundText}
				variant="h6"
				component="h2"
			>
				The user hasn't got any galleries yet
			</Typography>
		);
	};

	const userHasGallery = () => {
		return profileOwnerGalleries && profileOwnerGalleries?.length > 0
	};

	const NoGalleryFoundView = () => {
		if (viewingOwnProfile) {
			return NoGalleryFoundCreateGallery();
		} else {
			return NoGalleryFound();
		}
	}

	const GallerySection = () => {
		return userHasGallery() ? Galleries() : NoGalleryFoundView();
	};

	return (
		<div className={classes.mainContainer}>
			{
				user &&
				(<>
						<ProfileHeader ownProfile={viewingOwnProfile} profile={profileOwner} />
						<div className={classes.galleriesContainer}>
							{
								GallerySection()
							}
						</div>
				</>)
			}
		</div>
	);
};

export default Profile;
