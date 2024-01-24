import UploadForm from '@/components/pages/images/UploadForm'
import CameraIcon from '@mui/icons-material/Camera'
import { Avatar, Box, Container, Paper, Typography } from '@mui/material'

export default function Checkout() {
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{ m: 3, bgcolor: 'secondary.main', alignItems: 'center' }}
          >
            <CameraIcon />
          </Avatar>
          <Typography variant="h6" align="center" sx={{ alignItems: 'center' }}>
            新しい画像をアップロード
          </Typography>
        </Box>
        <UploadForm />
      </Paper>
    </Container>
  )
}
