import React from "react";
import ProfileHeader from "../components/profile/ProfileHeader";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

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
	noGalleryFoundDescription: {
		fontSize: "20px",
		letterSpacing: "1px",
		width: "60vw",
		marginBottom: "4vh",
	},
	createGalleryButton: {
		paddingTop: "2vh",
		paddingBottom: "2vh",
	},
}));

const Profile = ({ user }) => {
	const classes = useStyles();

	const galleries = () => {
		return (
			<Grid container spacing={4} className={classes.galleriesContainer}>
				<p>Hello</p>
			</Grid>
		);
	};

	const noGalleryFound = () => {
		return (
			<div className={classes.noGalleryFoundContainer}>
				<p className={classes.noGalleryFoundDescription}>
					Galleries are a great way to present your NFT portfolio to people!
					Create one by clicking the button below.
				</p>
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

	return (
		<div className={classes.mainContainer}>
			<ProfileHeader profile={user} />
			{user?.galleries ? galleries() : noGalleryFound()}
		</div>
	);
};

export default Profile;
