import React from "react";
import { Link, useHistory } from "react-router-dom";
import GalleryCoverImage from "./GalleryCoverImage";
import { makeStyles, darken } from "@material-ui/core/styles";
import { Grid, Typography, TextField, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
	galleryHeaderContainer: {
		display: "flex",
		justifyContent: "center",
		width: "80vw",
	},
	titleContainer: {
		display: "flex",
	},
	title: {
		color: theme.palette.text.primary,
	},
	galleryOwner: {
		marginTop: "2vh",
		color: theme.palette.primary.main,
	},
	creator: {
		textDecoration: "none",
		border: `solid 8px ${theme.palette.primary.main}`,
		borderRadius: 10,
		background: theme.palette.primary.main,
		cursor: "pointer",
		"&:hover": {
			color: theme.palette.primary.contrastText,
			background: darken(theme.palette.primary.main, 0.05),
			border: `solid 8px ${darken(theme.palette.primary.main, 0.05)}`,
		},
		"&:visited": {
			color: theme.palette.primary.contrastText,
		},
		"&:active": {
			color: theme.palette.primary.contrastText,
		},
	},
	descriptionContainer: {
		marginTop: "2vh",
	},
	description: {
		marginTop: "2vh",
		color: theme.palette.text.primary,
	},
	editGalleryButton: {
		color: theme.palette.secondary.light,
	},
	coverImageContainer: {
		display: "flex",
		justifyContent: "flex-end",
	},
	coverImage: {
		width: "400px",
		height: "400px",
	},
	galleryHeader: {
		marginTop: "1vh",
	},
}));

const HeaderDefaultLayout = (props) => {
	const history = useHistory();

	const classes = useStyles();
	return (
		<Grid container spacing={6} className={classes.galleryHeaderContainer}>
			<Grid
				className={classes.coverImageContainer}
				item
				lg={5}
				md={5}
				sm={6}
				xs={8}
			>
				<div className={classes.coverImage}>
					<GalleryCoverImage
						coverImage={props.coverImage}
						isEditable={props.isEditable}
						isOwner={props.isOwner}
						handleDropzoneSubmit={props.handleDropzoneSubmit}
						setIsCoverImageUpdated={props.setIsCoverImageUpdated}
					/>
				</div>
			</Grid>
			<Grid item lg={7} md={7} sm={6} xs={4}>
				<div className={classes.galleryHeader}>
					<div className={classes.titleContainer}>
						{props.isOwner && !props.isEditable ? (
							<>
								<IconButton
									className={classes.editGalleryButton}
									aria-label="edit-gallery"
									onClick={() => {
										props.switchEditableMode();
									}}
								>
									<EditIcon />
								</IconButton>
								<Typography className={classes.title} variant="h4">
									{props.galleryName}
								</Typography>
							</>
						) : (
							<form noValidate autoComplete="off">
								<TextField
									fullWidth
									value={props.galleryName}
									inputProps={{ style: { fontSize: "2.125rem" } }}
									size="medium"
									onChange={(event) => props.setGalleryName(event.target.value)}
								/>
							</form>
						)}
					</div>
					<div className={classes.galleryOwner}>
						<Typography
							to={`/profile/${props.galleryJson?.userId}`}
							component={Link}
							className={classes.creator}
							variant="h5"
						>
							{props.galleryJson.creator}
						</Typography>
					</div>
					<div className={classes.descriptionPanel}>
						{props.isOwner && !props.isEditable ? (
							<>
								<Typography className={classes.description} variant="h5">
									{props.galleryDescription}
								</Typography>
							</>
						) : (
							<form
								noValidate
								autoComplete="off"
								className={classes.descriptionContainer}
							>
								<TextField
									multiline
									fullWidth
									value={props.galleryDescription}
									inputProps={{ style: { fontSize: "1.5rem" } }}
									size="medium"
									onChange={(event) =>
										props.setGalleryDescription(event.target.value)
									}
								/>
							</form>
						)}
					</div>
				</div>
			</Grid>
		</Grid>
	);
};

export default HeaderDefaultLayout;
