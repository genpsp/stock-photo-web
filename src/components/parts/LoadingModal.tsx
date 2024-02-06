import CheckIcon from '@mui/icons-material/Check'
import UploadIcon from '@mui/icons-material/Upload'
import {
  Box,
  CircularProgress,
  Fab,
  Fade,
  Modal,
  Typography,
  css,
} from '@mui/material'
import { green } from '@mui/material/colors'

type Props = {
  isLoading: boolean
  isSuccess: boolean
  closeCallback?: () => void
}

export default function LoadingModal({
  isLoading,
  isSuccess,
  closeCallback,
}: Props) {
  return (
    <Modal open={isLoading} closeAfterTransition>
      <Fade in={isLoading} timeout={1500} onExited={closeCallback}>
        <Box
          css={modalStyle}
          sx={{ display: 'flex', flexDirection: 'column' }}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Fab aria-label="save" color={isSuccess ? 'primary' : 'warning'}>
            {isSuccess ? <CheckIcon /> : <UploadIcon />}
          </Fab>
          {isLoading && (
            <CircularProgress
              size={68}
              sx={{
                color: green[300],
                position: 'absolute',
                zIndex: 1,
              }}
            />
          )}
          <Typography
            variant="h6"
            sx={{
              position: 'absolute',
              mt: 15,
              color: isLoading ? 'white' : 'black',
            }}
          >
            {isLoading ? 'Uploading...' : 'Success!'}
          </Typography>
        </Box>
      </Fade>
    </Modal>
  )
}

const modalStyle = css`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
`
