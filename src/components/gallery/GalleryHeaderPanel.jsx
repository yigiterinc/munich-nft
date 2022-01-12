import React from "react";
import { makeStyles, darken } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
	galleryOwner: {
		marginTop: "2vh",
	},
	title: {
		display: "flex",
		alignItems: "center",
	},
	creator: {
		textDecoration: "none",
		border: "solid 8px #e5e5ea",
		borderRadius: 10,
		background: "#e5e5ea",
		cursor: "pointer",
		"&:hover": {
			color: "#65657d",
			background: darken("#e5e5ea", 0.05),
			border: `solid 8px ${darken("#e5e5ea", 0.05)}`,
		},
		"&:visited": {
			color: "#65657d",
		},
		"&:active": {
			color: "#65657d",
		},
	},
	descriptionContainer: {
		marginTop: "2vh",
	},
	description: {
		marginTop: "2vh",
	},
});

const GalleryHeaderPanel = (props) => {
	const galleryJson = props.json;
	const classes = useStyles();
	return (
		<div className={classes.galleryHeaderpanel}>
			<div className={classes.title}>
				{props.isOwner && !props.isEditable ? (
					<>
						<IconButton
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
					to={`/profile/${galleryJson?.userId}`}
					component={Link}
					className={classes.creator}
					variant="h5"
				>
					{galleryJson.creator}
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
	);
};

export default GalleryHeaderPanel;
