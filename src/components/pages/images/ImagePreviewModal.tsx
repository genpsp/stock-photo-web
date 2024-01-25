import CloseIcon from '@mui/icons-material/Close'
import { Box, Fade, IconButton, Modal, css } from '@mui/material'
import { ReactElement } from 'react'

type Props = {
  children: ReactElement
  isOpen: boolean
  handleClose: () => void
}

export default function ImagePreviewModal({
  children,
  isOpen,
  handleClose,
}: Props) {
  return (
    <Modal open={isOpen} onClose={handleClose} closeAfterTransition>
      <Fade in={isOpen} timeout={300}>
        <Box css={modalStyle}>
          {children}
          <IconButton css={closeButtonStyle} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
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
  height: 65%;
  max-width: 75%;
  border-radius: 3px;
  background-color: #eee;
`

const closeButtonStyle = css`
  position: absolute;
  top: 8px;
  right: 8px;
  color: #000;
`
