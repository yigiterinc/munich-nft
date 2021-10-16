import React from "react";

import { create } from "ipfs-http-client";
import { CID } from "ipfs-http-client";

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
			multiple={false}
			inputContent="Drag your Art here!"
		/>
	);
}

export default IpfsUploader;
