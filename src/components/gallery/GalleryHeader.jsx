import React from "react";
import HeaderDefaultLayout from "./gallery-header/HeaderDefaultLayout";
import HeaderLayout1 from "./gallery-header/HeaderLayout1";
import HeaderLayout2 from "./gallery-header/HeaderLayout2";

const GalleryHeader = (props) => {
	return <>{renderSelectedHeaderLayout(props)}</>;
};

const renderSelectedHeaderLayout = (props) => {
	if (props.headerLayout === "default") {
		return <HeaderDefaultLayout {...props} />;
	} else if (props.headerLayout === "layout-1") {
		return <HeaderLayout1 {...props} />;
	} else if (props.headerLayout === "layout-2") {
		return <HeaderLayout2 {...props} />;
	}
};

export default GalleryHeader;
