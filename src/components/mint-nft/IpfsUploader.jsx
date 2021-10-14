import React from "react";

import { create } from "ipfs-http-client";
import { CID } from "ipfs-http-client";

import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

const client = create(new URL("https://ipfs.infura.io:5001"));

function IpfsUploader({ openDialog, onUploaded, closeDialog }) {
	const getUploadParams = () => {
		return { url: "https://httpbin.org/post" };
	};

	// called every time a file's status changes
	const handleChangeStatus = ({ meta, file }, status) => {
		console.log(status, meta, file);
	};

	const handleSubmit = async (files, allFiles) => {
		files.forEach(async (file) => {
			console.log(file);
			openDialog();
			const res = await client.add(file.file);
			onUploaded(res.path);
			console.log(res);
			file.remove();
			closeDialog();
		});
	};

	return (
		<Dropzone
			getUploadParams={getUploadParams}
			onChangeStatus={handleChangeStatus}
			onSubmit={handleSubmit}
			accept="image/*,audio/*,video/*"
			maxFiles={1}
			inputContent="Drag your Art here!"
		/>
	);
}

export default IpfsUploader;
