import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import Compressor from "compressorjs";
import { makeStyles } from "@material-ui/core/styles";
import { useFileUpload } from "use-file-upload";
import { STRAPI_BASE_URL } from "../../constants/strapiConstants";

const useStyles = makeStyles((theme) => ({
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
}));

const ProfileImageUpload = ({ userId, profileImage, setNewProfileImage }) => {
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
			setNewProfileImage(compressedImage);
		}
	}, [compressedImage]);

	const compressImage = () => {
		return new Compressor(uploadedProfileImage.file, {
			quality: 0.6,
			success: (compressedResult) => {
				setCompressedImage(
					new File([compressedResult], userId, {
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
		} else if (profileImage?.url) {
			return ImageWithUploadOnClick(STRAPI_BASE_URL + profileImage.url);
		} else {
			return (
				<Avatar className={classes.avatar}>
					<PersonIcon onClick={() => handleProfileImageUpload()} />
				</Avatar>
			);
		}
	};

	return ProfileImage();
};

export default ProfileImageUpload;
