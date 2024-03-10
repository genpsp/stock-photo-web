import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  TextField,
} from '@mui/material'

export default function SigninForm() {
  return (
    <Box component="form" noValidate sx={{ mt: 1 }}>
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
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
  )
}
