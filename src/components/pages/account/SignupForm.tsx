import { auth } from '@/lib/firebase/init';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { SubmitHandler, useForm } from 'react-hook-form';

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
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const email = data.email
    const password = data.password
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('サインアップしました')
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
    })
  }

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit(onSubmit)} 
      sx={{ mt: 3 }}
    >
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="family-name"
          label="姓"
          fullWidth
          id="lastName"
          {...register('lastName', {
            required: true
            })
          }
          autoFocus
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="firstName"
          label="名"
          autoComplete="given-name"
          {...register('firstName', {
            required: true
            })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="email"
          label="メールアドレス"
          autoComplete="email"
          {...register('email', {
            required: true,
            pattern: {
              value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
              message: "入力形式がメールアドレスではありません。"
            }
            })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="パスワード"
          type="password"
          id="password"
          autoComplete="new-password"
          {...register('password', {
            required: true,
            minLength: {
              value: 6,
              message:'パスワードは6文字以上で入力してください'
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
              message:'パスワードには英字と数字をを含めてください'
            },
            })
          }
        />
        {errors?.password && <Typography>{errors.password.message}</Typography>}
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel sx={{mt: 2}}
          control={<Checkbox color="primary" />}
          label="利用規約とプライバシーポリシーに同意する"
          {...register('agreement', {
            required: true
            })
          }
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