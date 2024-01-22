import AddIcon from '@mui/icons-material/AddCircle'
import CameraIcon from '@mui/icons-material/PhotoCamera'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()

  return (
    <AppBar position="relative">
      <Toolbar>
        <CameraIcon sx={{ mr: 2 }} />
        <Typography
          variant="h6"
          noWrap
          sx={{ flexGrow: 1, color: 'text.secondary' }}
        >
          StockPhoto
        </Typography>
        <Button
          color="ui"
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
