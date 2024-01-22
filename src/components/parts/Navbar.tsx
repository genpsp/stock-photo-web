import AddIcon from '@mui/icons-material/AddCircle'
import CameraIcon from '@mui/icons-material/PhotoCamera'
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()

  return (
    <AppBar position="relative">
      <Toolbar>
        <CameraIcon sx={{ mr: 2 }} />
        <Typography variant="h6" noWrap sx={{ color: 'ui', flexGrow: 1 }}>
          StockPhoto
        </Typography>
        <Button
          color="ui"
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => router.push('/images/register')}
          sx={{ mr: 2 }}
        >
          アップロード
        </Button>
        <Tooltip
          title="アカウント"
          onClick={() => router.push('/account/signup')}
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, -14],
                  },
                },
              ],
            },
          }}
        >
          <IconButton>
            <Avatar src="/images/example.jpg" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}
