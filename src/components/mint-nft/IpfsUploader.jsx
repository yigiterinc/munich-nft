import React from "react";

import "react-dropzone-uploader/dist/styles.css";


import ipfsHelper from "../../api/ipfsHelper";
import FileDropzone from "../common/FileDropzone";

function IpfsUploader({ onUploadStart, onUploaded, dropzoneStyles }) {
	// called every time a file's status changes
	const handleChangeStatus = ({ meta, file }, status) => {
		console.log(status, meta, file);
	};

	const handleSubmit = async (file) => {
		onUploadStart();
		console.log(file);
		const uploadResult = await ipfsHelper.addFile(file);
		onUploaded(uploadResult.path);
	};

	return (
		<FileDropzone dropzoneStyles={dropzoneStyles}
									handleChangeStatus={handleChangeStatus}
									handleSubmit={handleSubmit}
								  text="Drag your Art here"/>
	);
}

export default IpfsUploader;
