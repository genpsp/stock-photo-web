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
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
  firstName: string
  lastName: string
  email: string
  password: string
  agreement: boolean
}

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<Inputs>({ mode: 'onChange' })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        console.log('サインアップしました', userCredential.user)
      })
      .catch((error) => {
        console.log('サインアップエラー', error.message)
      })
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="lastName"
            autoComplete="family-name"
            label="姓"
            fullWidth
            required
            autoFocus
            error={'lastName' in errors}
            helperText={errors.lastName && errors.lastName.message}
            {...register('lastName', {
              required: true,
              maxLength: {
                value: 10,
                message: '10文字以内にしてください',
              },
            })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="firstName"
            fullWidth
            label="名"
            required
            autoComplete="given-name"
            error={'firstName' in errors}
            helperText={errors.firstName && errors.firstName.message}
            {...register('firstName', {
              required: true,
              maxLength: {
                value: 10,
                message: '10文字以内にしてください',
              },
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email"
            fullWidth
            label="メールアドレス"
            autoComplete="email"
            required
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
            id="password"
            fullWidth
            label="パスワード"
            type="password"
            autoComplete="new-password"
            required
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
            control={<Checkbox color="primary" />}
            label="利用規約とプライバシーポリシーに同意する"
            {...register('agreement', { required: true })}
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
