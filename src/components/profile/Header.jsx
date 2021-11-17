import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Compressor from "compressorjs";
import { makeStyles } from "@material-ui/core/styles";
import { truncateAddress } from "../../utils";
import { useFileUpload } from "use-file-upload";
import { changeUserProfilePicture, uploadProfileImage } from "../../api/strapi";
import { STRAPI_BASE_URL } from "../../constants/strapiConstants";

const useStyles = makeStyles((theme) => ({
	title: {
		height: "auto",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		background:
			"linear-gradient(90deg, rgba(93,78,156,1) 0%, rgba(184,202,250,1) 100%)",
	},
	avatar: {
		marginTop: "2vh",
		width: theme.spacing(12),
		height: theme.spacing(12),
		cursor: "pointer",
	},
	image: {
		objectFit: "cover",
		marginTop: "2vh",
		borderRadius: "50%",
		height: theme.spacing(12),
		width: theme.spacing(12),
		cursor: "pointer",
	},
	name: {
		marginTop: theme.spacing(1),
		fontSize: "25px",
		fontWeight: "lighter",
		letterSpacing: "1px",
	},
	importButton: {
		marginTop: "2vh",
		marginBottom: "2vh",
	},
	address: {
		marginTop: "10px",
		letterSpacing: "1.5px",
	},
}));

const Header = ({ profile, openImportModal }) => {
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
			let image = await uploadProfileImage(compressedImage, profile).then(resp => response = resp);
			let profileImageUploadResult = await changeUserProfilePicture(image, profile);
			console.log(profileImageUploadResult);
		}
	}, [compressedImage]);

	const compressImage = () => {
		return new Compressor(uploadedProfileImage.file, {
			quality: 0.6,
			success: (compressedResult) => {
				setCompressedImage(new File([compressedResult], profile.address, {
					type: compressedResult.type,
				}));
			},
		});
	};

	const handleProfileImageUpload = () => {
		setUploadedProfileImage(
			{ accept: "image/*", multiple: false },
			({ name, size, source, file }) => {
				console.log("File Selected", { name, size, source, file });
			},
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
			return ImageWithUploadOnClick(STRAPI_BASE_URL + profile.profilePicture.url);
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
			<>
				<Typography className={classes.name} variant="h5" component="h2">
					{profile?.username}
				</Typography>
				<Typography className={classes.address} variant="h6" component="h2" color="textSecondary">
					{truncateAddress(`${profile?.walletAddress}`, 13)}
				</Typography>
			</>);
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
		)
	}

	const renderProfile = () => {
		const elements = [];
		elements.push(ProfileImage());
		elements.push(ProfileSummary());
		elements.push(importButton())

		return elements;
	};

	return (
		<Paper className={classes.title}>
			{
				profile &&
				renderProfile()
			}
		</Paper>
	);
};

export default Header;
