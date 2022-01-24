import React, { useState } from "react";
import {
	withStyles,
	Button,
	Menu,
	MenuItem,
	ListItemIcon,
	ListItemText,
} from "@material-ui/core";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddorRemoveAssets from "../edit-gallery/AddorRemoveAssets";

const StyledMenu = withStyles({
	paper: {
		border: "1px solid #d3d4d5",
	},
})((props) => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: "top",
			horizontal: "center",
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "center",
		}}
		{...props}
	/>
));

const GalleryMenu = ({ setShowAddAssetsView, setShowRemoveAssetsView }) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Button
				aria-label="more"
				aria-controls="gallery-menu"
				startIcon={<MoreVertIcon />}
				aria-haspopup="true"
				onClick={handleClick}
			>
				Nfts
			</Button>
			<StyledMenu
				id="gallery-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={() => setShowAddAssetsView(true)}>
					<ListItemIcon>
						<AddToPhotosIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="Add NFTs" />
				</MenuItem>
				<MenuItem onClick={() => setShowRemoveAssetsView(true)}>
					<ListItemIcon>
						<DeleteForeverIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="Remove NFTs" />
				</MenuItem>
			</StyledMenu>
		</>
	);
};

export default GalleryMenu;
