import React, { useState } from "react";
import { makeStyles, ButtonGroup, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import BrushIcon from "@material-ui/icons/Brush";
import SaveIcon from "@material-ui/icons/Save";
import EditGalleryModal from "./gallery-edit-manager/EditGalleryModal";
import GalleryMenu from "./GalleryMenu";

const useStyles = makeStyles((theme) => ({
	galleryEditManagerContainer: {
		position: "fixed",
		height: "40px",
		marginTop: "-1.2vh",
		marginBottom: "2.5vh",
		marginLeft: "2vw",
		color: theme.palette.secondary.light,
	},
	buttonsContainer: {
		width: "100px",
		display: "flex",
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	edit: {
		width: "100px",
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
											setOpenLayoutModal(true);
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
							</div>
						</>
					)}
				</div>
			)}
		</>
	);
};

export default GalleryEditManager;
