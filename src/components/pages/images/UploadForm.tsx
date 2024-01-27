import { postApiImagesUpload } from '@/orval/generated/images/images'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  css,
} from '@mui/material'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import ImagePreviewModal from './ImagePreviewModal'

type Inputs = {
  title: string
  file: FileList
}

export default function UploadForm() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [fileName, setFileName] = useState('')
  const [imageData, setImageData] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<Inputs>()

  const { ref, onChange, ...rest } = register('file', {
    required: 'ファイルを選択してくださいaaa',
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

  const initFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setImageData('')
    setFileName('')
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
            onClick={handleFileInputClick}
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
