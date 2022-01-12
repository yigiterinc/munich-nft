import React from "react";
import {
	makeStyles,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Divider,
	Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	layoutPickerContainer: {
		marginTop: "2vh",
		padding: theme.spacing(2),
	},
	layoutPanel: {
		alignItems: "center",
		justifyContent: "center",
		color: theme.palette.common.black,
	},
	layoutOption: {
		marginTop: "2vh",
		display: "flex",
		alignItems: "center",
	},
	layoutLabel: {
		width: 150,
		marginRight: "2vw",
	},
	divider: {
		marginTop: "2vh",
	},
	description: {
		marginTop: "2vh",
	},
	formControl: {
		minWidth: 120,
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
			<div className={classes.layoutPanel}>
				<Typography variant="h5">Layout Settings</Typography>
				<Divider className={classes.divider} />
				<Typography variant="h6" className={classes.description}>
					You can try different layouts for both header and nfts section
				</Typography>
				<div className={classes.layoutOption}>
					<Typography
						variant="h6"
						className={classes.layoutLabel}
						component="div"
					>
						Header Layout
					</Typography>
					<FormControl className={classes.formControl}>
						<Select
							labelId="header-layout-select"
							id="header-select"
							value={props.headerLayout}
							onChange={handleHeaderLayoutChange}
							className={classes.selector}
						>
							<MenuItem value="default">Default</MenuItem>
							<MenuItem value="layout-1">Layout 1</MenuItem>
							<MenuItem value="layout-2">Layout 2</MenuItem>
						</Select>
					</FormControl>
				</div>

				<div className={classes.layoutOption}>
					<Typography
						variant="h6"
						className={classes.layoutLabel}
						component="div"
					>
						NFTs Layout
					</Typography>

					<FormControl className={classes.formControl}>
						<Select
							labelId="nfts-layout-select"
							id="nfts-select"
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
			</div>
		</div>
	);
};

export default LayoutPicker;
