import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import Compressor from "compressorjs";
import { makeStyles } from "@material-ui/core/styles";
import { useFileUpload } from "use-file-upload";
import { STRAPI_BASE_URL } from "../../constants/strapiConstants";

const useStyles = makeStyles((theme) => ({
	avatar: ({ isCircle, height, width }) => ({
		marginTop: "2vh",
		borderRadius: isCircle ? "50%" : 10,
		width: width,
		height: height,
		cursor: "pointer",
	}),
	image: ({ height, width, isCircle }) => ({
		objectFit: "cover",
		marginTop: "2vh",
		borderRadius: isCircle ? "50%" : 10,
		height: height,
		width: width,
		cursor: "pointer",
	}),
}));

const ImageUploadWithPreview = ({
	userId,
	image,
	setNewImage,
	isCircle = false,
	height,
	width,
}) => {
	const [uploadedImage, setUploadedImage] = useFileUpload();
	const [compressedImage, setCompressedImage] = useState();
	const classes = useStyles({ isCircle, height, width });

	useEffect(async () => {
		if (uploadedImage) {
			compressImage();
		}
	}, [uploadedImage]);

	useEffect(async () => {
		if (compressedImage) {
			setNewImage(compressedImage);
		}
	}, [compressedImage]);

	const compressImage = () => {
		return new Compressor(uploadedImage.file, {
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

	const handleImageUpload = () => {
		setUploadedImage(
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
				onClick={() => handleImageUpload()}
			/>
		);
	};

	const ImageUploadWithPreview = () => {
		if (uploadedImage) {
			return ImageWithUploadOnClick(uploadedImage?.source);
		} else if (image?.url) {
			return ImageWithUploadOnClick(STRAPI_BASE_URL + image.url);
		} else {
			return (
				<Avatar className={classes.avatar} onClick={() => handleImageUpload()}>
					<ImageIcon />
				</Avatar>
			);
		}
	};

	return ImageUploadWithPreview();
};

export default ImageUploadWithPreview;
