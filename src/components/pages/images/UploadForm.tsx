import { postApiImagesUpload } from '@/orval/generated/images/images'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  css,
} from '@mui/material'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
  title: string
  file: FileList
}

export default function UploadForm() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [fileName, setFileName] = useState('')
  const [imageData, setImageData] = useState('')
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors },
  } = useForm<Inputs>()
  const { ref, onChange, ...rest } = register('file', {
    required: 'ファイルを選択してください',
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = event.target.files && event.target.files[0]
    if (file) {
      const fileReader = new FileReader()
      setFileName(file.name)
      fileReader.onload = () => {
        setImageData(fileReader.result as string)
      }
      fileReader.readAsDataURL(file)
    }
  }

  const handleFileInputClick = () => {
    fileInputRef.current?.click()
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const file: File | null = data.file && data.file[0]

    try {
      postApiImagesUpload({
        title: data.title,
        file: file,
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ px: 2, pt: 2 }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="title"
            label="タイトル"
            fullWidth
            variant="standard"
            required
            error={'title' in errors}
            helperText={errors.title?.message}
            {...register('title', { required: 'タイトルを入力してください' })}
          />
        </Grid>
        <Grid item xs={12}>
          {imageData && (
            <Image
              src={imageData}
              width={100}
              height={100}
              objectFit="contain"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
              alt=""
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="imageFile"
            name="imageFile"
            label="画像ファイル"
            value={fileName}
            fullWidth
            variant="standard"
            required
            error={'file' in errors}
            helperText={errors.file?.message}
            onClick={handleFileInputClick}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachFileIcon />
                </InputAdornment>
              ),
            }}
          />
          <input
            type="file"
            css={hiddenStyle}
            accept="image/png, image/jpeg"
            onChange={(e) => {
              onChange(e)
              handleFileChange(e)
            }}
            ref={(e) => {
              ref(e)
              fileInputRef.current = e
            }}
            {...rest}
          ></input>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="prompt"
            name="prompt"
            label="生成プロンプト"
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              disabled={!isValid}
              variant="contained"
              sx={{ mt: 2 }}
            >
              アップロード
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

const hiddenStyle = css`
  display: none;
`