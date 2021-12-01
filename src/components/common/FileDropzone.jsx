import React from "react";
import BackupIcon from "@material-ui/icons/Backup";
import { Typography } from "@material-ui/core";
import Dropzone from "react-dropzone-uploader";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {

	},
	icon: {
		marginBottom: "10px"
	}
}))

const FileDropzone = ({ dropzoneStyles, handleChangeStatus, handleSubmit, text }) => {
	const classes = useStyles()

  return (
		<Dropzone
			onChangeStatus={handleChangeStatus}
			onSubmit={(files) => handleSubmit(Object.assign(files[0].file, {
				preview: URL.createObjectURL(files[0].file)
			}))}
			accept="image/*"
			maxFiles={1}
			multiple={false}
			styles={{
				dropzone: { ...dropzoneStyles },
			}}
			inputContent={
				<div>
					<BackupIcon className={classes.icon}/>
					<Typography variant="h6">{text}</Typography>
				</div>
			}
		/>
  );
};

export default FileDropzone;