import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Compressor from "compressorjs";
import { darken, lighten, makeStyles } from "@material-ui/core/styles";
import { truncateAddress } from "../../utils";
import { useFileUpload } from "use-file-upload";
import { changeUserProfilePicture, uploadProfileImage } from "../../api/strapi";
import { STRAPI_BASE_URL } from "../../constants/strapiConstants";

const useStyles = makeStyles((theme) => ({
	mainContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	headerContainer: {
		height: "auto",
		minWidth: "80vw",
		minHeight: "30vh",
		background: lighten("rgb(236,239,241)", 0.6),
		"&:hover": {
			background: "rgb(236,239,241)",
			cursor: "pointer"
		}
	},
	avatar: {
		width: theme.spacing(14),
		height: theme.spacing(14),
		marginTop: theme.spacing(-11),
		boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.20) 0px 0px 0px 1px",
		cursor: "pointer",
		marginBottom: "1vh",
		background: "rgb(224,227,225)",
		"&:hover": {
			background: darken("rgb(224,227,225)", 0.05)
		}
	},
	image: {
		objectFit: "cover",
		marginTop: "2vh",
		borderRadius: "50%",
		height: theme.spacing(12),
		width: theme.spacing(12),
		cursor: "pointer",
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
		fontWeight: "lighter",
		letterSpacing: "1px",
	},
	address: {
		marginTop: "10px",
		letterSpacing: "1.5px",
	},
}));

const ProfileHeader = ({ profile, openImportModal }) => {
	const classes = useStyles();
	const [uploadedProfileImage, setUploadedProfileImage] = useFileUpload();
	const [compressedImage, setCompressedImage] = useState();

	useEffect(async () => {
		if (uploadedProfileImage) {
			compressImage();
		}
	}, [uploadedProfileImage]);

	useEffect(async () => {
		if (compressedImage) {
			let response;
			let image = await uploadProfileImage(compressedImage, profile).then(
				(resp) => (response = resp)
			);
			let profileImageUploadResult = await changeUserProfilePicture(
				image,
				profile
			);
			console.log(profileImageUploadResult);
		}
	}, [compressedImage]);

	const compressImage = () => {
		return new Compressor(uploadedProfileImage.file, {
			quality: 0.6,
			success: (compressedResult) => {
				setCompressedImage(
					new File([compressedResult], profile.address, {
						type: compressedResult.type,
					})
				);
			},
		});
	};

	const handleProfileImageUpload = () => {
		setUploadedProfileImage(
			{ accept: "image/*", multiple: false },
			({ name, size, source, file }) => {
				console.log("File Selected", { name, size, source, file });
			}
		);
	};

	const ImageWithUploadOnClick = (source) => {
		return (
			<img
				src={source}
				alt="preview"
				className={classes.image}
				onClick={() => handleProfileImageUpload()}
			/>
		);
	};

	const ProfileImage = () => {
		if (uploadedProfileImage) {
			return ImageWithUploadOnClick(uploadedProfileImage?.source);
		} else if (profile?.profilePicture?.url) {
			return ImageWithUploadOnClick(
				STRAPI_BASE_URL + profile.profilePicture.url
			);
		} else {
			return (
				<Avatar className={classes.avatar}>
					<PersonIcon onClick={() => handleProfileImageUpload()} />
				</Avatar>
			);
		}
	};

	const ProfileSummary = () => {
		return (
			<div className={classes.profileSummary}>
				<Typography className={classes.name} variant="h5" component="h2">
					{profile?.username}
				</Typography>
				<Typography
					className={classes.address}
					variant="h6"
					component="h2"
					color="textSecondary"
				>
					{truncateAddress(`${profile?.walletAddress}`, 13)}
				</Typography>
			</div>
		);
	};

	const importButton = () => {
		return (
			<Button
				variant="contained"
				size="large"
				className={classes.importButton}
				onClick={() => openImportModal()}
			>
				IMPORT
			</Button>
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
			<Paper elevation={1} className={classes.headerContainer}/>
			{profile && renderProfile()}
		</div>
)
};

export default ProfileHeader;
