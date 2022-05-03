import React, { useState, useEffect } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import { darken, lighten, makeStyles } from "@material-ui/core/styles";
import { truncateWalletAddress } from "../../utils/commons";
import {
	changeUserProfilePicture,
	changeUserBannerImage,
	uploadImageToMediaGallery,
} from "../../api/strapi";
import ImageUploadWithPreview from "../common/ImageUploadWithPreview";

const useStyles = makeStyles((theme) => ({
	mainContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
	},
	profileImage: {
		marginTop: theme.spacing(-11),
		zIndex: 1,
	},
	profileSummary: {
		marginBottom: "6vh",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	name: {
		marginTop: theme.spacing(1),
		fontSize: "25px",
		fontWeight: 500,
		letterSpacing: "1px",
	},
	walletAddresses: {
		marginTop: theme.spacing(1),
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		gap: "10px",
	},
	bio: {
		marginTop: theme.spacing(2),
		fontSize: "18px",
		color: "gray",
		fontWeight: 400,
		letterSpacing: "1px",
	},
	profileSettingsButton: {
		position: "absolute",
		top: "32vh",
		right: 0,
	},
}));

const ProfileHeader = ({ ownProfile, profile }) => {
	const classes = useStyles();
	const [updatedProfileImage, setUpdatedProfileImage] = useState();
	const [updatedBannerImage, setUpdatedBannerImage] = useState();
	const [isEthAddressClicked, setIsEthAddressClicked] = useState(false);
	const [isSolAddressClicked, setIsSolAddressClicked] = useState(false);

	useEffect(async () => {
		if (updatedProfileImage) {
			let profileImage = await uploadImageToMediaGallery(updatedProfileImage);
			let profileImageUploadResult = await changeUserProfilePicture(
				profileImage,
				profile
			);
			console.log(profileImageUploadResult);
		}
	}, [updatedProfileImage]);

	useEffect(async () => {
		if (updatedBannerImage) {
			let bannerImage = await uploadImageToMediaGallery(updatedBannerImage);
			let bannerImageUploadResult = await changeUserBannerImage(
				bannerImage,
				profile
			);
			console.log(bannerImageUploadResult);
		}
	}, [updatedBannerImage]);

	useEffect(() => {
		if (isEthAddressClicked) {
			setTimeout(() => {
				setIsEthAddressClicked(false);
			}, "1000");
		}
	}, [isEthAddressClicked]);

	useEffect(() => {
		if (isSolAddressClicked) {
			setTimeout(() => {
				setIsSolAddressClicked(false);
			}, "1000");
		}
	}, [isSolAddressClicked]);

	const copyToClipboard = (str) => {
		if (navigator && navigator.clipboard && navigator.clipboard.writeText)
			return navigator.clipboard.writeText(str);
		return Promise.reject("The Clipboard API is not available.");
	};

	const ProfileImage = () => {
		return (
			<div className={classes.profileImage}>
				<ImageUploadWithPreview
					isCircle
					height={100}
					width={100}
					userId={profile?.id}
					image={profile?.profilePicture}
					setNewImage={(uploadedImage) => {
						setUpdatedProfileImage(uploadedImage);
					}}
				/>
			</div>
		);
	};

	const ProfileSummary = () => {
		return (
			<div className={classes.profileSummary}>
				<Typography className={classes.name} variant="h5" component="h2">
					{profile?.username ? profile.username : "Alien"}
				</Typography>
				<div className={classes.walletAddresses}>
					{profile.ethAddress && (
						<Chip
							avatar={<Avatar alt="Eth" src="/images/eth_logo.png" />}
							label={
								isEthAddressClicked
									? "Copied!"
									: truncateWalletAddress(`${profile?.ethAddress}`, 13)
							}
							onClick={() => {
								setIsEthAddressClicked(true);
								copyToClipboard(profile.ethAddress);
							}}
							variant="outlined"
						/>
					)}
					{profile.solAddress && (
						<Chip
							avatar={<Avatar alt="Sol" src="/images/sol_logo.png" />}
							label={
								isSolAddressClicked
									? "Copied!"
									: truncateWalletAddress(`${profile?.solAddress}`, 13)
							}
							onClick={() => {
								setIsSolAddressClicked(true);
								copyToClipboard(profile.solAddress);
							}}
							variant="outlined"
						/>
					)}
				</div>

				<Typography className={classes.bio} variant="h6" component="h2">
					{profile.bio}
				</Typography>
			</div>
		);
	};

	const renderProfile = () => {
		const elements = [];
		elements.push(ProfileImage());
		elements.push(ProfileSummary());

		return elements;
	};

	return (
		<div className={classes.mainContainer}>
			<ImageUploadWithPreview
				height={"30vh"}
				width={"80vw"}
				userId={profile?.id}
				image={profile?.bannerImage}
				setNewImage={(uploadedImage) => {
					setUpdatedBannerImage(uploadedImage);
				}}
			/>
			{ownProfile && (
				<IconButton
					component={Link}
					to="/profile-settings"
					className={classes.profileSettingsButton}
				>
					<SettingsIcon fontSize="large" />
				</IconButton>
			)}
			{profile && renderProfile()}
		</div>
	);
};

export default ProfileHeader;
