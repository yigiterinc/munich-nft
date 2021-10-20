import React from "react";

import { create } from "ipfs-http-client";
import { CID } from "ipfs-http-client";

import { Typography } from "@material-ui/core";
import BackupIcon from "@material-ui/icons/Backup";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

import ipfsHelper from "../../api/ipfsHelper";

function IpfsUploader({ onUploaded }) {
	// called every time a file's status changes
	const handleChangeStatus = ({ meta, file }, status) => {
		console.log(status, meta, file);
	};

	const handleSubmit = async (files, allFiles) => {
		files.forEach(async (file) => {
			console.log(file);
			// TODO handle errors
			const uploadResult = await ipfsHelper.addFile(file.file);
			onUploaded(uploadResult.path);
			console.log(uploadResult);
			file.remove();
		});
	};

	return (
		<Dropzone
			onChangeStatus={handleChangeStatus}
			onSubmit={handleSubmit}
			accept="image/*,audio/*,video/*"
			maxFiles={1}
			multiple={false}
			styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
			inputContent={
				<div>
					<BackupIcon />
					<Typography variant="h6">Drag your Art here!</Typography>
				</div>
			}
		/>
	);
}

export default IpfsUploader;
