import { Box, Typography } from '@mui/material'
import React from 'react'

function Footer() {
  return (
    <Box sx={{ mt: 0, p: 2, backgroundColor: '#f5f5f5' }}>
    <Typography variant="body2" align="center" color="textSecondary">
      &copy; 2023 SellMyCar. All rights reserved.
    </Typography>
  </Box>
  )
}

export default Footer