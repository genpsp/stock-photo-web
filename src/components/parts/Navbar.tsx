import AddIcon from '@mui/icons-material/AddCircle'
import CameraIcon from '@mui/icons-material/PhotoCamera'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()

  return (
    <AppBar position="relative">
      <Toolbar>
        <CameraIcon sx={{ mr: 2, color: 'white' }} />
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1, color: 'white' }}
        >
          StockPhoto
        </Typography>
        <Button
          sx={{ color: 'white' }}
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => router.push('/images/register')}
        >
          アップロード
        </Button>
      </Toolbar>
    </AppBar>
  )
}
