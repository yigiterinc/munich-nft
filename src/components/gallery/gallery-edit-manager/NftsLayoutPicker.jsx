import React from "react";
import {
	makeStyles,
	withStyles,
	Radio,
	RadioGroup,
	FormControlLabel,
} from "@material-ui/core";
import defaultLayout from "../../../assets/images/layout-samples/nftDefaultLayout.png";
import layout1 from "../../../assets/images/layout-samples/nftLayout1.png";
import layout2 from "../../../assets/images/layout-samples/nftLayout2.png";

const useStyles = makeStyles((theme) => ({
	layoutPickerContainer: {
		width: "100%",
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	options: {
		marginBottom: "1.5vh",
		marginLeft: "2.75vw",
		marginRight: "2.75vw",
		border: "1px solid black",
		borderRadius: "2px",
	},
	image: {
		width: "100%",
		height: "100%",
		objectFit: "cover",
	},
}));

const BlackRadio = withStyles({
	root: {
		color: "#000",
		"&$checked": {
			color: "#000",
		},
	},
	checked: {},
})((props) => <Radio color="default" {...props} />);

const NftsLayoutPicker = (props) => {
	const handleNftsLayoutChange = (event) =>
		props.setNftsLayout(event.target.value);

	const classes = useStyles();
	return (
		<div className={classes.layoutPickerContainer}>
			<RadioGroup
				aria-label="layout"
				name="layout"
				value={props.nftsLayout}
				onChange={handleNftsLayoutChange}
			>
				<FormControlLabel
					value="default"
					control={<BlackRadio />}
					label={
						<img
							src={defaultLayout}
							className={classes.image}
							alt="default-layout"
						/>
					}
					className={classes.options}
				/>
				<FormControlLabel
					value="layout-1"
					control={<BlackRadio />}
					label={<img src={layout1} className={classes.image} alt="layout-1" />}
					className={classes.options}
				/>
				<FormControlLabel
					value="layout-2"
					control={<BlackRadio />}
					label={<img src={layout2} className={classes.image} alt="layout-2" />}
					className={classes.options}
				/>
			</RadioGroup>
		</div>
	);
};

export default NftsLayoutPicker;
