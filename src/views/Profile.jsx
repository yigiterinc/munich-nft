import React, { useEffect, useState } from "react";
import ProfileHeader from "../components/profile/ProfileHeader";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, darken } from "@material-ui/core/styles";
import { Link, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { fetchExistingUserWithId, fetchUserGalleries } from "../api/strapi";
import GalleryCard from "../components/common/GalleryCard";
import { getLoggedInUser, isUserLoggedIn } from "../utils/auth-utils";
import withSpinner from "../components/common/WithSpinner";

const useStyles = makeStyles((theme) => ({
	mainContainer: {
		paddingTop: "4vh",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	galleriesContainer: {
		position: "relative",
		padding: "4vh 6vw",
		borderRadius: "2px",
		marginBottom: "5vh",
		width: "75vw",
		minHeight: "30vh",
		boxShadow: "0px 0px 5px #b35bff, 0px 5px 20px #ca8eff",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
	},
	createGalleryDescription: {
		fontSize: "20px",
		fontWeight: "lighter",
		letterSpacing: "1px",
		width: "60vw",
		marginBottom: "4vh",
		textAlign: "center",
	},
	createGalleryButton: {
		paddingTop: "2vh",
		paddingBottom: "2vh",
		background: "#b35bff",
		color: "white",
		"&:hover": {
			background: darken("#b35bff", 0.1),
		},
	},
	noGalleryFoundText: {
		fontSize: "20px",
		fontWeight: "lighter",
		letterSpacing: "1px",
	},
	addGalleryButton: {
		position: "absolute",
		top: 7,
		right: 7,
	},
}));

const Profile = () => {
	const classes = useStyles();
	const [profileOwner, setProfileOwner] = useState();
	const [profileOwnerGalleries, setProfileOwnerGalleries] = useState(null);
	const [gallerySectionLoading, setGallerySectionLoading] = useState(true);
	const [user, setUser] = useState(null);

	let { userId: userIdParam } = useParams();

	useEffect(async () => {
		if (isUserLoggedIn() && userIdParam === getLoggedInUser()?.id) {
			let loggedInUser = getLoggedInUser();
			setUser(loggedInUser);
			setProfileOwner(loggedInUser);
		}
		let response = await fetchExistingUserWithId(userIdParam);
		if (response.status === 200) {
			setProfileOwner(response.data[0]);
		} else {
			console.log("Failed to fetch user data");
		}
		setProfileOwnerGalleries(await fetchUserGalleries(userIdParam));
	}, [userIdParam]);

	useEffect(() => {
		if (profileOwnerGalleries) {
			setGallerySectionLoading(false);
		}
	}, [profileOwnerGalleries]);

	const Galleries = () => {
		return (
			<Grid container spacing={3}>
				{userIdParam === user?.id && (
					<Tooltip title="Add Gallery">
						<IconButton
							component={Link}
							to="/create-gallery"
							className={classes.addGalleryButton}
						>
							<AddCircleOutlineIcon fontSize="large" />
						</IconButton>
					</Tooltip>
				)}
				{profileOwnerGalleries.map((gallery) => (
					<Grid key={gallery.id} item lg={3} md={4} sm={6} xs={12}>
						<GalleryCard gallery={gallery} />
					</Grid>
				))}
			</Grid>
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
		return profileOwnerGalleries && profileOwnerGalleries?.length > 0;
	};

	const NoGalleryFoundView = () => {
		if (userIdParam === user?.id) {
			return NoGalleryFoundCreateGallery();
		} else {
			return NoGalleryFound();
		}
	};

	const GallerySection = () => {
		return userHasGallery() ? Galleries() : NoGalleryFoundView();
	};

	return (
		<div className={classes.mainContainer}>
			<ProfileHeader
				ownProfile={userIdParam === user?.id}
				profile={profileOwner}
			/>
			{withSpinner(
				<div className={classes.galleriesContainer}>{GallerySection()}</div>,
				gallerySectionLoading
			)}
		</div>
	);
};

export default Profile;
