import AccountLayout from '@/components/layouts/account'
import SigninForm from '@/components/pages/account/SigninForm'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Avatar, Box, Typography } from '@mui/material'
import { ReactElement } from 'react'

export default function SignIn() {
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   const data = new FormData(event.currentTarget)
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   })
  // }

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
        サインイン
      </Typography>
      <SigninForm />
    </Box>
  )
}

SignIn.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>
}
