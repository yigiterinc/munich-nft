import React from "react";
import Carousel from "react-multi-carousel";
import { Typography } from "@material-ui/core";
import "react-multi-carousel/lib/styles.css";
import { makeStyles } from "@material-ui/core/styles";
import GallerySummary from "./GallerySummary";

const useStyles = makeStyles({
	title: {
		textAlign: "center",
		fontSize: "30px",
		fontWeight: "lighter",
		letterSpacing: "2px",
		textTransform: "uppercase",
		marginBottom: "5vh",
	},
	carouselItem: {
		padding: "20px 0 20px 20px",
	},
});

const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 4,
		slidesToSlide: 3,
		partialVisibilityGutter: 60,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 3,
		slidesToSlide: 2,
		partialVisibilityGutter: 50,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
		slidesToSlide: 1,
		partialVisibilityGutter: 30,
	},
};

// const galleries = [
// 	{
// 		creator: "John Doe",
// 		images: [
// 			"https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
// 			"https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
// 			"https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
// 		],
// 	},
// 	{
// 		creator: "Jane Doe",
// 		images: [
// 			"https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
// 			"https://images.unsplash.com/photo-1550223640-23097fc71cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
// 			"https://images.unsplash.com/photo-1550353175-a3611868086b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
// 		],
// 	},
// 	{
// 		creator: "Malke Rince",
// 		images: [
// 			"https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
// 			"https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
// 			"https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
// 		],
// 	},
// 	{
// 		creator: "Gime Salkok",
// 		images: [
// 			"https://images.unsplash.com/photo-1550353175-a3611868086b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
// 			"https://images.unsplash.com/photo-1550223640-23097fc71cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
// 			"https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
// 		],
// 	},
// ];

const galleries = [
	{
		image:
			"https://images.unsplash.com/photo-1562448079-b5631888445f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2835&q=80",
	},
	{
		image:
			"https://images.unsplash.com/photo-1562448079-b5631888445f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2835&q=80",
	},
	{
		image:
			"https://images.unsplash.com/photo-1562448079-b5631888445f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2835&q=80",
	},
	{
		image:
			"https://images.unsplash.com/photo-1562448079-b5631888445f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2835&q=80",
	},
	{
		image:
			"https://images.unsplash.com/photo-1562448079-b5631888445f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2835&q=80",
	},
	{
		image:
			"https://images.unsplash.com/photo-1562448079-b5631888445f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2835&q=80",
	},
	{
		image:
			"https://images.unsplash.com/photo-1562448079-b5631888445f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2835&q=80",
	},
	{
		image:
			"https://images.unsplash.com/photo-1562448079-b5631888445f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2835&q=80",
	},
];

const TopGalleries = ({ deviceType }) => {
	const classes = useStyles();

	return (
		<div>
			<Typography className={classes.title}>Top Galleries</Typography>
			<Carousel
				ssr
				partialVisible
				deviceType={deviceType}
				itemClass={classes.carouselItem}
				responsive={responsive}
			>
				{galleries.map((gallery) => {
					return <GallerySummary gallery={gallery} />;
				})}
			</Carousel>
		</div>
	);
};

export default TopGalleries;
