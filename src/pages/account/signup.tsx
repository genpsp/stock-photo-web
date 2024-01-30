import AccountLayout from '@/components/layouts/account'
import SignupForm from '@/components/pages/account/SignupForm'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {
  Avatar,
  Box,
  Typography
} from '@mui/material'
import { ReactElement } from 'react'

export default function SignUp() {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 3, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        アカウントを作成
      </Typography>
      <SignupForm />
    </Box>
  )
}

SignUp.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>
}
