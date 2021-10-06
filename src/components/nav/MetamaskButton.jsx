import React from "react";

import Button from "@material-ui/core/Button";

function MetamaskButton({ loginWithMetamask }) {
	return (
		<Button onClick={() => loginWithMetamask()} variant="contained">
			Connect with Metamask
		</Button>
	);
}

export default MetamaskButton;
