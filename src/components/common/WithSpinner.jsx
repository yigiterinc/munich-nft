import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const withSpinner = (component, loading, spinnerStyles) => {

	const renderSpinner = () => {
		return (
			<CircularProgress style={spinnerStyles}/>
		);
	};

  return (
      <div>
				{
					loading ?
						renderSpinner()
						:
						component
				}
			</div>
  );
};

export default withSpinner;