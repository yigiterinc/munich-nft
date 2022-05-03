import React, { useEffect, useState } from "react";
import EditGalleryMenu from "./gallery-edit-manager/EditGalleryMenu";
import { Grid, Link, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GalleryCoverImage from "./gallery-header/GalleryCoverImage";
import { truncateString } from "../../utils/commons";

const useStyles = makeStyles((theme) => ({
	galleryHeaderContainer: {
		display: "flex",
		justifyContent: "center",
		width: "96vw",
		margin: "auto",
	},
	title: {
		fontSize: "36px", // will be updated after theme variable setup
		lineHeight: "4rem",
		color: theme.palette.text.primary,
	},
	galleryOwner: {
		display: "flex",
		marginLeft: "0.2vw",
		marginTop: "0.5vh",
		marginBottom: "4vh",
		textAlign: "center",
	},
	createdTextLabel: {
		color: theme.palette.text.primary,
		marginRight: "0.3vw",
		fontSize: "16px", // will be updated after theme variable setup
	},
	titleTextField: {
		lineHeight: "64px",
	},
	creator: {
		textDecoration: "none",
		cursor: "pointer",
		color: theme.palette.primary.main,
		fontWeight: "bold",
		fontSize: "16px", // will be updated after theme variable setup
	},
	description: {
		marginTop: "2vh",
		color: theme.palette.text.primary,
		fontSize: "18px", // will be updated after theme variable setup
	},
	coverImageContainer: {
		display: "flex",
		justifyContent: "flex-end",
	},
}));

const GalleryHeader = (props) => {
	const classes = useStyles();

	const [updatedMetadata, setUpdatedMetadata] = useState();

	useEffect(() => {
		let { galleryName, coverImage, galleryDescription } = props.gallery;

		setUpdatedMetadata({
			galleryName,
			coverImage,
			galleryDescription,
		});
	}, []);

	const canEditGallery = () => {
		return props.isOwner && props.inEditMode;
	};

	const CoverImage = () => {
		return (
			<Grid
				className={classes.coverImageContainer}
				item
				lg={3}
				md={3}
				sm={4}
				xs={6}
			>
				<GalleryCoverImage
					coverImage={props.gallery.coverImage}
					isEditable={props.inEditMode}
					isOwner={props.isOwner}
					handleDropzoneSubmit={props.handleDropzoneSubmit}
					isCoverImageUpdated={props.isCoverImageUpdated}
					setIsCoverImageUpdated={props.setIsCoverImageUpdated}
				/>
			</Grid>
		);
	};

	const GalleryName = () => {
		return (
			<Typography className={classes.title} variant="h4">
				{props.gallery.galleryName}
			</Typography>
		);
	};

	const EditGalleryName = () => {
		return (
			<div className={classes.titleTextField}>
				<form noValidate autoComplete="off">
					<TextField
						fullWidth
						value={updatedMetadata.galleryName}
						inputProps={{ style: { fontSize: "36px" } }}
						onChange={(event) =>
							setUpdatedMetadata({
								...updatedMetadata,
								galleryName: event.target.value,
							})
						}
					/>
				</form>
			</div>
		);
	};

	const CreatedBy = () => {
		return (
			<div className={classes.galleryOwner}>
				<Typography className={classes.createdTextLabel} variant="h5">
					Created by
				</Typography>
				<Typography
					to={`/profile/${props.gallery?.userId}`}
					component={Link}
					className={classes.creator}
					variant="h5"
				>
					{props.gallery?.username
						? props.gallery?.username
						: truncateString(props.gallery?.userId, 8)}
				</Typography>
			</div>
		);
	};

	const Description = () => {
		return (
			<Typography className={classes.description} variant="h5">
				{props.gallery?.description}
			</Typography>
		);
	};

	const EditDescription = () => {
		return (
			<form noValidate autoComplete="off">
				<TextField
					multiline
					fullWidth
					value={updatedMetadata.description}
					inputProps={{ style: { fontSize: "18px" } }}
					onChange={(event) =>
						setUpdatedMetadata({
							...updatedMetadata,
							description: event.target.value,
						})
					}
				/>
			</form>
		);
	};

	const HeaderDefaultLayout = () => {
		return (
			<>
				<CoverImage />
				<Grid item lg={5} md={5} sm={4} xs={2}>
					{canEditGallery() ? <EditGalleryName /> : <GalleryName />}

					<CreatedBy />

					{canEditGallery() ? <EditDescription /> : <Description />}
				</Grid>
			</>
		);
	};

	const HeaderLayout1 = () => {
		return (
			<>
				<Grid item lg={5} md={5} sm={4} xs={2}>
					{canEditGallery() ? <EditGalleryName /> : <GalleryName />}

					<CreatedBy />

					{canEditGallery() ? <EditDescription /> : <Description />}
				</Grid>

				<CoverImage />
			</>
		);
	};

	const HeaderLayout2 = () => {
		return (
			<Grid item lg={8} md={8} sm={8} xs={8}>
				{canEditGallery() ? <EditGalleryName /> : <GalleryName />}

				<CoverImage />
				<CreatedBy />
				{canEditGallery() ? <EditDescription /> : <Description />}
			</Grid>
		);
	};

	const LAYOUT_PROP_TO_COMPONENT = {
		default: <HeaderDefaultLayout {...props} />,
	};
	LAYOUT_PROP_TO_COMPONENT["layout-1"] = <HeaderLayout1 {...props} />;
	LAYOUT_PROP_TO_COMPONENT["layout-2"] = <HeaderLayout2 {...props} />;

	return (
		<Grid container spacing={6} className={classes.galleryHeaderContainer}>
			<Grid item lg={1} md={1} sm={1} xs={1}>
				<EditGalleryMenu
					setOpenEditGalleryModal={props.setOpenEditGalleryModal}
					inEditMode={props.inEditMode}
					isOwner={props.isOwner}
					switchEditableMode={props.switchEditableMode}
					handleUpdateGallery={props.handleUpdateGallery}
					setShowAddAssetsView={props.setShowAddAssetsView}
					setShowRemoveAssetsView={props.setShowRemoveAssetsView}
					updatedMetadata={updatedMetadata}
				/>
			</Grid>

			{LAYOUT_PROP_TO_COMPONENT[props.headerLayout]}

			<Grid item lg={1} md={1} sm={1} xs={1} />
		</Grid>
	);
};

export default GalleryHeader;
