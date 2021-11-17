import React from "react";

import { Typography } from "@material-ui/core";
import BackupIcon from "@material-ui/icons/Backup";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

import ipfsHelper from "../../api/ipfsHelper";

function IpfsUploader({ onUploadStart, onUploaded }) {
	// called every time a file's status changes
	const handleChangeStatus = ({ meta, file }, status) => {
		console.log(status, meta, file);
	};

	const handleSubmit = async (files) => {
		onUploadStart();

		files.forEach(async (file) => {
			const uploadResult = await ipfsHelper.addFile(file.file);
			file.remove();
			onUploaded(uploadResult.path);
		});
	};

	return (
		<Dropzone
			onChangeStatus={handleChangeStatus}
			onSubmit={handleSubmit}
			accept="image/*,audio/*,video/*"
			maxFiles={1}
			multiple={false}
			styles={{
				dropzone: { minHeight: 200, maxHeight: 250, maxWidth: "60vw" },
			}}
			inputContent={
				<div>
					<BackupIcon />
					<Typography variant="h6">Drag your Art here</Typography>
				</div>
			}
		/>
	);
}

export default IpfsUploader;
