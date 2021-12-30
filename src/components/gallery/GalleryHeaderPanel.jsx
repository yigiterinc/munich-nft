import React, { useState } from "react";
import { makeStyles, darken } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { getLoggedInUser } from "../../utils/auth-utils";

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
	description: {
		marginTop: "2vh",
	},
});

const GalleryHeaderPanel = (props) => {
	const currentUser = getLoggedInUser();
	const galleryJson = props.json;
	const classes = useStyles();
	return (
		<div className={classes.galleryHeaderpanel}>
			<div className={classes.title}>
				{currentUser.id === galleryJson.userId && !props.isEditable && (
					<IconButton
						aria-label="edit-gallery"
						onClick={() => {
							props.switchEditableMode();
						}}
					>
						<EditIcon />
					</IconButton>
				)}
				<Typography className={classes.title} variant="h4">
					{galleryJson.name}
				</Typography>
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
			<Typography className={classes.description} variant="h5">
				{galleryJson.description}
			</Typography>
		</div>
	);
};

export default GalleryHeaderPanel;
