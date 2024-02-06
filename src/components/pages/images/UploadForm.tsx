import { postApiImagesUpload } from '@/orval/generated/images/images'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import CloseIcon from '@mui/icons-material/Close'
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  css,
} from '@mui/material'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import ImagePreviewModal from './ImagePreviewModal'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import LoadingModal from '@/components/parts/LoadingModal'
import { PostApiImagesUploadBody } from '@/orval/generated/model'

type Inputs = {
  title: string
  file: FileList
}

export default function UploadForm() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [fileName, setFileName] = useState('')
  const [imageData, setImageData] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<Inputs>()

  const uploadImageMutation = useMutation({
    mutationFn: (req: PostApiImagesUploadBody) =>
      postApiImagesUpload(req, { timeout: 40000 }),
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const file: File | null = data.file && data.file[0]
    uploadImageMutation.mutate(
      {
        title: data.title,
        file: file,
      },
      { onError: () => setSnackbarOpen(true) },
    )
  }

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

  const initFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setImageData('')
    setFileName('')
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ px: 2, pt: 1 }}
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
            <div css={imagePreviewStyle} onClick={() => setModalOpen(true)}>
              <Image
                src={imageData}
                fill
                style={{ objectFit: 'contain' }}
                alt="プレビュー画像"
              />
            </div>
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
            onClick={() => fileInputRef.current?.click()}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachFileIcon />
                </InputAdornment>
              ),
              endAdornment: imageData && (
                <IconButton onClick={initFile}>
                  <CloseIcon />
                </IconButton>
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
              disabled={!isValid || !imageData}
              variant="contained"
              sx={{ mt: 2 }}
            >
              アップロード
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={(_, reason) =>
          reason !== 'clickaway' && setSnackbarOpen(false)
        }
      >
        <Alert severity="warning" variant="filled" sx={{ width: '100%' }}>
          サーバーでエラーが発生しました
        </Alert>
      </Snackbar>
      <ImagePreviewModal
        isOpen={modalOpen}
        handleClose={() => setModalOpen(false)}
      >
        <Image
          src={imageData}
          fill
          style={{ objectFit: 'contain' }}
          alt="プレビュー画像"
        />
      </ImagePreviewModal>
      <LoadingModal
        isLoading={uploadImageMutation.isPending}
        isSuccess={uploadImageMutation.isSuccess}
        closeCallback={() => uploadImageMutation.isSuccess && router.push('/')}
      />
    </Box>
  )
}

const hiddenStyle = css`
  display: none;
`

const imagePreviewStyle = css`
  position: relative;
  max-width: 100%;
  height: 40vh;
`
