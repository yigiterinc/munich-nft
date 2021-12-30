import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import FileDropzone from "../common/FileDropzone";

const GalleryCoverImage = (props) => {
	console.log(props.coverImage);
	return (
		<div key={props.coverImage}>
			{props.isOwner && props.isEditable ? (
				<FileDropzone
					handleSubmit={props.handleDropzoneSubmit}
					handleChangeStatus={() => console.log("status changed")}
					coverImage={
						<Card>
							<CardMedia component="img" src={props.coverImage} />
						</Card>
					}
				/>
			) : (
				<Card>
					<CardMedia component="img" src={props.coverImage} />
				</Card>
			)}
		</div>
	);
};

export default GalleryCoverImage;
