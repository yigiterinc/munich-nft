import React from "react";
import EditGalleryMenu from "./gallery-edit-manager/EditGalleryMenu";

const GalleryEditManager = (props) => {
	return (
		<>
			{(
					<EditGalleryMenu
						setOpenEditGalleryModal={props.setOpenEditGalleryModal}
						inEditMode={props.inEditMode}
						isOwner={props.isOwner}
						switchEditableMode={props.switchEditableMode}
						handleUpdateGallery={props.handleUpdateGallery}
						setShowAddAssetsView={props.setShowAddAssetsView}
						setShowRemoveAssetsView={props.setShowRemoveAssetsView}
						updatedMetadata={props.updatedMetadata}
						/>
			)}
		</>
	);
};

export default GalleryEditManager;
