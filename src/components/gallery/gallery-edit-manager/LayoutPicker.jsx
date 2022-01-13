import React from "react";
import {
	makeStyles,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	layoutPickerContainer: {
		display: "flex",
		alignItems: "center",
		marginLeft: "4vw",
		color: theme.palette.common.black,
	},
	label: {
		marginRight: "1vw",
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	inputLabel: {
		color: theme.palette.common.black,
	},
	selector: {
		color: theme.palette.common.black,
	},
	menu: {
		color: theme.palette.common.black,
	},
}));

const LayoutPicker = (props) => {
	const classes = useStyles();

	const handleHeaderLayoutChange = (event) => {
		props.setHeaderLayout(event.target.value);
	};
	const handleNftsLayoutChange = (event) => {
		props.setNftsLayout(event.target.value);
	};

	return (
		<div className={classes.layoutPickerContainer}>
			<Typography variant="h6" className={classes.label}>
				Layouts
			</Typography>
			<FormControl variant="outlined" className={classes.formControl}>
				<InputLabel
					className={classes.inputLabel}
					id="demo-simple-select-outlined-label"
				>
					Header
				</InputLabel>
				<Select
					labelId="header-layout-select"
					id="header-select"
					label="header-layout"
					value={props.headerLayout}
					onChange={handleHeaderLayoutChange}
					className={classes.selector}
				>
					<MenuItem value="default" className={classes.menu}>
						Default
					</MenuItem>
					<MenuItem value="layout-1" className={classes.menu}>
						Layout 1
					</MenuItem>
					<MenuItem value="layout-2" className={classes.menu}>
						Layout 2
					</MenuItem>
				</Select>
			</FormControl>
			<FormControl variant="outlined" className={classes.formControl}>
				<InputLabel
					id="demo-simple-select-outlined-label"
					className={classes.inputLabel}
				>
					NFTs
				</InputLabel>
				<Select
					labelId="nft-layout-select"
					id="nft-select"
					label="nft-layout"
					value={props.nftsLayout}
					onChange={handleNftsLayoutChange}
					className={classes.selector}
				>
					<MenuItem value="default" className={classes.menu}>
						Default
					</MenuItem>
					<MenuItem value="layout-1" className={classes.menu}>
						Layout 1
					</MenuItem>
					<MenuItem value="layout-2" className={classes.menu}>
						Layout 2
					</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
};

export default LayoutPicker;
