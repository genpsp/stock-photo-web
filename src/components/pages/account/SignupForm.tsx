import { auth } from '@/lib/firebase/init';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  TextField,
} from '@mui/material';
import { createUserWithEmailAndPassword } from "firebase/auth";
type Inputs = {
  title: string
  file: FileList
}

export default function SignupForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get('email')
    const password = data.get('password')
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('サインアップしました')
        // Signed in 
        const user = userCredential.user
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('サインアップエラー',errorCode)
      });
    console.log({
      email,
      password
      // email: data.get('email'),
      // password: data.get('password'),
    })
  }

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="given-name"
          name="firstName"
          required
          fullWidth
          id="firstName"
          label="姓"
          autoFocus
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="lastName"
          label="名"
          name="lastName"
          autoComplete="family-name"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="email"
          label="メールアドレス"
          name="email"
          autoComplete="email"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="password"
          label="パスワード"
          type="password"
          id="password"
          autoComplete="new-password"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox value="allowExtraEmails" color="primary" />}
          label="利用規約とプライバシーポリシーに同意する"
        />
      </Grid>
    </Grid>
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      サインアップ
    </Button>

    <Grid container justifyContent="flex-end">
      <Grid item>
        すでにアカウントをお持ちですか？
        <Link href="#" variant="body2">
          ログイン
        </Link>
        する
      </Grid>
    </Grid>
    </Box>
  )
}