import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MetamaskButton from "./MetamaskButton";

const useStyles = makeStyles((theme) => ({
	navMobileMenu: {
		flexDirection: "column",
	},
}));

const MobileMenu = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const classes = useStyles();
	return (
		<div>
			<Button
				aria-controls="simple-menu"
				aria-haspopup="true"
				onClick={handleClick}
			>
				Menu
			</Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				className={classes.navMobileMenu}
			>
				<MenuItem href="/market" onClick={handleClose}>
					Marketplace
				</MenuItem>
				<MenuItem href="/create" onClick={handleClose}>
					Create
				</MenuItem>
				<MenuItem href="/import" onClick={handleClose}>
					Import
				</MenuItem>
				<MenuItem href="/my-profile" onClick={handleClose}>
					My Profile
				</MenuItem>
				<MetamaskButton />
			</Menu>
		</div>
	);
};

export default MobileMenu;
