import React from "react";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	formControl: {
		marginLeft: "auto",
		width: "auto",
		height: "auto",
	},
}));

const Dropdown = ({
	options,
	onChange,
	value = null,
	disabled,
	fullWidth,
	placeholder,
}) => {
	const classes = useStyles();
	return (
		<FormControl className={classes.formControl}>
			<Select
				variant="outlined"
				onChange={({ target: { value: newValue } }) => onChange(newValue)}
				value={value}
				disabled={disabled}
				fullWidth={fullWidth}
				displayEmpty
			>
				<MenuItem key="not-selected" value={null} disabled>
					{placeholder}
				</MenuItem>
				{options?.map((option, index) => (
					<MenuItem key={index} value={option}>
						{option}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default Dropdown;
