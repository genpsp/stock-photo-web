import * as React from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import DirectionsIcon from '@mui/icons-material/Directions'

export default function SearchBar() {
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 8px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '25px',
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="画像を検索"
        inputProps={{ 'aria-label': 'search iamges' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}
