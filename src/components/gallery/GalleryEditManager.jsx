import React, { useState } from "react";
import { makeStyles, Button, Divider } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import BrushIcon from "@material-ui/icons/Brush";
import SaveIcon from "@material-ui/icons/Save";
import EditGalleryModal from "./gallery-edit-manager/EditGalleryModal";
import GalleryMenu from "./GalleryMenu";

const useStyles = makeStyles((theme) => ({
	galleryEditManagerContainer: {
		width: "100%",
		height: "40px",
		marginTop: "-3vh",
		marginBottom: "2.5vh",
		marginLeft: "2vw",
		display: "flex",
		color: theme.palette.secondary.light,
	},
	buttonsContainer: {
		display: "flex",
	},
	divider: {
		marginLeft: "1vw",
		marginRight: "1vw",
		background: theme.palette.secondary.light,
	},
}));

const GalleryEditManager = (props) => {
	const [openLayoutModal, setOpenLayoutModal] = useState(false);
	const closeLayoutModal = () => setOpenLayoutModal(false);

	const classes = useStyles();
	return (
		<>
			{props.isOwner && (
				<div className={classes.galleryEditManagerContainer}>
					{props.isEditMode ? (
						<>
							<div className={classes.buttonsContainer}>
								<Button
									aria-label="edit-gallery"
									startIcon={<EditIcon />}
									onClick={() => {
										props.switchEditableMode();
									}}
								>
									Edit
								</Button>
								<Divider
									orientation="vertical"
									flexItem
									className={classes.divider}
								/>
								<Button
									aria-label="customize-gallery"
									startIcon={<BrushIcon />}
									onClick={() => {
										setOpenLayoutModal(true);
									}}
								>
									Customize
								</Button>
								<GalleryMenu
									setShowAddAssetsView={props.setShowAddAssetsView}
									setShowRemoveAssetsView={props.setShowRemoveAssetsView}
								/>
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
							</div>
							<EditGalleryModal
								openLayoutModal={openLayoutModal}
								closeLayoutModal={closeLayoutModal}
								switchEditableMode={props.switchEditableMode}
								headerLayout={props.headerLayout}
								setHeaderLayout={props.setHeaderLayout}
								galleryTheme={props.galleryTheme}
								setGalleryTheme={props.setGalleryTheme}
							/>
						</>
					) : (
						<>
							<div className={classes.buttonsContainer}>
								<Button
									aria-label="edit-gallery"
									startIcon={<EditIcon />}
									onClick={() => {
										props.switchEditableMode();
									}}
								>
									Edit
								</Button>
							</div>
						</>
					)}
				</div>
			)}
		</>
	);
};

export default GalleryEditManager;
