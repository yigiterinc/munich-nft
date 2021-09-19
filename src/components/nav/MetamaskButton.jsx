import React from 'react'

import Button from '@mui/material/Button'

function MetamaskButton({ loginWithMetamask }) {
  return (
    <Button onClick={() => loginWithMetamask()} variant="contained">
      Connect with Metamask
    </Button>
  )
}

export default MetamaskButton
