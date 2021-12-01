import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import ProfileImageUpload from "../components/profile/ProfileImageUpload";
import { changeUserProfilePicture, uploadProfileImage } from "../api/strapi";

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: "10vh",
		[theme.breakpoints.up("xs")]: {
			paddingLeft: "10vw",
			paddingRight: "0vw",
		},
		[theme.breakpoints.up("sm")]: {
			paddingLeft: "15vw",
			paddingRight: "0vw",
		},
		[theme.breakpoints.up("md")]: {
			paddingLeft: "20vw",
			paddingRight: "5vw",
		},
		[theme.breakpoints.up("lg")]: {
			paddingLeft: "25vw",
			paddingRight: "20vw",
		},
	},
	title: {
		paddingBottom: "5vh",
	},
	textField: {
		marginTop: 20,
		[theme.breakpoints.up("xs")]: {
			width: "30vw",
		},
		[theme.breakpoints.up("sm")]: {
			width: "30vw",
		},
		[theme.breakpoints.up("md")]: {
			width: "25vw",
		},
		[theme.breakpoints.up("lg")]: {
			width: "20vw",
		},
	},
	saveButton: {
		marginTop: "3vh",
	},
}));

const ProfileSettings = ({ user }) => {
	const [userData, setUserData] = useState({
		username: null,
		bio: null,
		email: null,
		profileImage: null,
		bannerImage: null,
	});
	const classes = useStyles();

	useEffect(() => {
		if (user) {
			setUserData({
				...userData,
				username: user.username,
				bio: user.bio,
				email: user.email,
				profileImage: user.profilePicture,
				bannerImage: user.bannerImage,
			});
		}
	}, [user]);

	const updateUser = async () => {
		// 	if (userData.profileImage) {
		// 		let response;
		// 		let image = await uploadProfileImage(userData.profileImage).then(
		// 			(resp) => (response = resp)
		// 		);
		// 		let profileImageUploadResult = await changeUserProfilePicture(
		// 			image,
		// 			user
		// 		);
		// 		console.log(profileImageUploadResult);
		// 	}
	};

	return (
		<div className={classes.container}>
			<Typography className={classes.title} variant="h4">
				Edit Profile
			</Typography>
			<Grid container spacing={2} alignItems={"flex-start"}>
				<Grid container item xs={7} spacing={4}>
					<Grid item xs={12}>
						<Typography variant="h6">Username</Typography>
						<TextField
							className={classes.textField}
							variant="outlined"
							placeholder="Enter username"
							fullWidth
							value={userData.username}
							onChange={(event) =>
								setUserData({ ...userData, username: event.target.value })
							}
						/>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="h6">Bio</Typography>
						<TextField
							className={classes.textField}
							variant="outlined"
							placeholder="Tell about yourself"
							fullWidth
							multiline
							rows={7}
							value={userData.bio}
							onChange={(event) =>
								setUserData({ ...userData, bio: event.target.value })
							}
						/>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="h6">Email Address</Typography>
						<TextField
							className={classes.textField}
							variant="outlined"
							placeholder="Enter email address"
							fullWidth
							value={userData.email}
							onChange={(event) =>
								setUserData({ ...userData, email: event.target.value })
							}
						/>
					</Grid>
					<Grid item xs={12}>
						<Button
							variant="contained"
							size="large"
							onClick={() => updateUser()}
							className={classes.saveButton}
						>
							Save
						</Button>
					</Grid>
				</Grid>
				<Grid container item xs={5} spacing={6}>
					<Grid item xs={12} style={{ height: "auto" }}>
						<Typography variant="h6">Profile Image</Typography>
						<ProfileImageUpload
							userId={user?.id}
							profileImage={userData.profileImage}
							setNewProfileImage={(uploadedImage) =>
								setUserData({ ...userData, profileImage: uploadedImage })
							}
						/>
					</Grid>
					{/* <Grid item xs={12}>
						<Typography variant="h6">Banner Image</Typography>
						<BannerImageUpload
						bannerImage={userData.bannerImage}
						setNewBannerImage={(uploadedImage) =>
							setUserData({ ...userData, bannerImage: uploadedImage })
						}
					/>
					</Grid> */}
				</Grid>
			</Grid>
		</div>
	);
};

export default ProfileSettings;
