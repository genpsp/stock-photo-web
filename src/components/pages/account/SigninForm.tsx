import { auth } from '@/lib/firebase/init'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  TextField,
} from '@mui/material'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
  email: string
  password: string
  save: boolean
}

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<Inputs>({ mode: 'onChange' })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        console.log('サインインしました：', userCredential.user)
      })
      .catch((error) => {
        console.log('サインインエラー', error.message)
      })
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="メールアドレス"
            autoComplete="email"
            autoFocus
            error={'email' in errors}
            helperText={errors.email && errors.email.message}
            {...register('email', {
              required: true,
              pattern: {
                value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
                message: '入力形式がメールアドレスではありません',
              },
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            error={'password' in errors}
            helperText={errors.password && errors.password.message}
            {...register('password', {
              required: true,
              minLength: {
                value: 6,
                message: 'パスワードは6文字以上で入力してください',
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                message: 'パスワードには英字と数字を含めてください',
              },
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            sx={{ mt: 2 }}
            control={<Checkbox value="remember" color="primary" />}
            label="ログイン情報を保存する"
            {...register('save', { required: true })}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={!isValid}
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
  )
}
