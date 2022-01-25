import React from "react";
import { makeStyles, ButtonGroup, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import BrushIcon from "@material-ui/icons/Brush";
import SaveIcon from "@material-ui/icons/Save";
import GalleryMenu from "../GalleryMenu";

const useStyles = makeStyles((theme) => ({
	buttonsContainer: {
		width: "100px",
		display: "flex",
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	edit: {
		width: "102.36px",
	},
}));

const EditGalleryButton = (props) => {
	const classes = useStyles();
	return (
		<div className={classes.buttonsContainer}>
			{props.isEditMode ? (
				<ButtonGroup
					orientation="vertical"
					color="secondary"
					aria-label="vertical outlined primary button group"
				>
					<Button
						aria-label="edit-gallery"
						startIcon={<EditIcon />}
						onClick={() => {
							props.switchEditableMode();
						}}
					>
						Edit
					</Button>
					<GalleryMenu
						setShowAddAssetsView={props.setShowAddAssetsView}
						setShowRemoveAssetsView={props.setShowRemoveAssetsView}
					/>
					<Button
						aria-label="customize-gallery"
						startIcon={<BrushIcon />}
						onClick={() => {
							props.setOpenLayoutModal(true);
						}}
					>
						Style
					</Button>
					<Button
						aria-label="save-gallery"
						startIcon={<SaveIcon />}
						onClick={() => {
							props.switchEditableMode();
							props.handleUpdateGallery();
						}}
					>
						Save
					</Button>
				</ButtonGroup>
			) : (
				<ButtonGroup
					orientation="vertical"
					color="secondary"
					aria-label="vertical outlined primary button group"
				>
					<Button
						className={classes.edit}
						aria-label="edit-gallery"
						startIcon={<EditIcon />}
						onClick={() => {
							props.switchEditableMode();
						}}
					>
						Edit
					</Button>
				</ButtonGroup>
			)}
		</div>
	);
};

export default EditGalleryButton;
