import AccountLayout from '@/components/layouts/account'

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  TextField,
} from '@mui/material'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
// import Box from '@mui/material/Box'
// import Button from '@mui/material/Button'
// import Checkbox from '@mui/material/Checkbox'
// import CssBaseline from '@mui/material/CssBaseline'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import Grid from '@mui/material/Grid'
// import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
// import * as React from 'react'

import { ReactElement } from 'react'

// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme()

export default function SignIn() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    })
  }

  return (
    // <ThemeProvider theme={defaultTheme}>
    // <Container component="main" maxWidth="xs">
    //   <CssBaseline />
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        サインイン
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="メールアドレス"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="パスワード"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="ログイン情報を保存する"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          サインイン
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              パスワードをお忘れですか？
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {'アカウントを作成'}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
    // </Container>
    // </ThemeProvider>
  )
}

SignIn.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>
}
