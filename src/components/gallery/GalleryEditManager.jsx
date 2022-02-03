import React from "react";
import EditGalleryMenu from "./gallery-edit-manager/EditGalleryMenu";

const GalleryEditManager = (props) => {
	return (
		<>
			{(
					<EditGalleryMenu
						setOpenEditGalleryModal={props.setOpenEditGalleryModal}
						isEditMode={props.isEditMode}
						switchEditableMode={props.switchEditableMode}
						handleUpdateGallery={props.handleUpdateGallery}
						setShowAddAssetsView={props.setShowAddAssetsView}
						setShowRemoveAssetsView={props.setShowRemoveAssetsView}
						/>
			)}
		</>
	);
};

export default GalleryEditManager;
