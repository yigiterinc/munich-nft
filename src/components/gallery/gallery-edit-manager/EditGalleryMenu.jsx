import React from "react";
import { makeStyles, ButtonGroup, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import BrushIcon from "@material-ui/icons/Brush";
import SaveIcon from "@material-ui/icons/Save";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles(() => ({
	editButton: {
		width: "8vw",
	},
}));

const EditGalleryMenu = (props) => {
	const classes = useStyles();

	const shouldOpenMenu = () => {
		return props.inEditMode && props.isOwner;
	}

	return (
		<>
			{shouldOpenMenu() ? (
				<ButtonGroup
					orientation="vertical"
					color="primary"
					size="medium"
					aria-label="vertical outlined primary button group"
				>
					<Button
						aria-label="edit-gallery"
						startIcon={<EditIcon fontSize="small" />}
						style={{ textTransform: "none" }}
						onClick={() => {
							props.switchEditableMode();
						}}
					>
						Edit
					</Button>
					<Button
						aria-label="add-nfts"
						startIcon={<AddToPhotosIcon fontSize="small" />}
						style={{ textTransform: "none" }}
						onClick={() => props.setShowAddAssetsView(true)}
					>
						NFTs
					</Button>
					<Button
						aria-label="remove-nfts"
						startIcon={<DeleteForeverIcon fontSize="small" />}
						style={{ textTransform: "none" }}
						onClick={() => props.setShowRemoveAssetsView(true)}
					>
						NFTs
					</Button>
					<Button
						aria-label="customize-gallery"
						startIcon={<BrushIcon fontSize="small" />}
						style={{ textTransform: "none" }}
						onClick={() => {
							props.setOpenEditGalleryModal(true);
						}}
					>
						Style
					</Button>
					<Button
						aria-label="save-gallery"
						startIcon={<SaveIcon fontSize="small" />}
						style={{ textTransform: "none" }}
						onClick={() => {
							props.switchEditableMode();
							props.handleUpdateGallery(props.updatedMetadata);
						}}
					>
						Save
					</Button>
				</ButtonGroup>
			) : (
				<ButtonGroup
					orientation="vertical"
					color="primary"
					size="medium"
					aria-label="vertical outlined primary button group"
				>
					<Button
						className={classes.editButton}
						aria-label="edit-gallery"
						startIcon={<EditIcon fontSize="small" />}
						style={{ textTransform: "none" }}
						onClick={() => {
							props.switchEditableMode();
						}}
					>
						Edit
					</Button>
				</ButtonGroup>
			)}
		</>
	);
};

export default EditGalleryMenu;
