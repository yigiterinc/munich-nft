import React from "react";
import Instruction from "./Instruction";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { IoMdWallet } from "react-icons/io";
import { BsCoin, BsDownload } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import { COLORS } from "../../theme/variables";

const iconSize = 50;

const instructions = [
	{
		label: "Connect your wallet",
		icon: <IoMdWallet size={iconSize} />,
		description:
			'Connect your MetaMask wallet by clicking "Connect Wallet" button on top right corner',
	},
	{
		label: "Import/Create NFTs",
		icon: <BsDownload size={iconSize} />,
		description:
			"Import your NFTs from multiple marketplaces or create new ones",
	},
	{
		label: "Customize your gallery",
		icon: <BiPencil size={iconSize} />,
		description:
			"Display NFTs from multiple blockchains and customize its looks to create a unique gallery",
	},
	{
		label: "Trade your NFTs",
		icon: <BsCoin size={iconSize} />,
		description: "Send offers to buy and sell NFTs",
	},
];

const useStyles = makeStyles((theme) => ({
	howItWorksContainer: {
		background: COLORS.sectionSecondary,
	},
	title: {
		textAlign: "center",
		fontSize: "30px",
		fontWeight: "lighter",
		letterSpacing: "2px",
		textTransform: "uppercase",
		marginBottom: "5vh",
	},
	instructionsContainer: {
		display: "flex",
		flexDirection: "row",
		padding: "2vh 2vw 2vh 2vw",
	},
}));

function HowItWorks() {
	const classes = useStyles();

	return (
		<div className={classes.howItWorksContainer}>
			<Typography className={classes.title}>How It Works</Typography>
			<div className={classes.instructionsContainer}>
				{instructions.map((instruction, i) => (
					<Instruction key={i} data={instruction} />
				))}
			</div>
		</div>
	);
}

export default HowItWorks;
