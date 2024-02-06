import DefaultLayout from '@/components/layouts/default'
import SearchBar from '@/components/parts/SearchBar'
import { getApiImages } from '@/orval/generated/images/images'
import {
  Box,
  Container,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useQuery } from '@tanstack/react-query'
import { ReactElement } from 'react'

export default function Top() {
  const { data, isPending } = useQuery({
    queryKey: ['images'],
    queryFn: getApiImages,
  })

  return (
    <>
      <Box
        sx={{
          pt: 45,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <SearchBar></SearchBar>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth={false}>
        <ImageList variant="masonry" cols={3} gap={4}>
          {(data ?? []).map((image) => (
            <ImageListItem key={image.id}>
              <img
                srcSet={`${image.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${image.url}?w=248&fit=crop&auto=format`}
                alt={image.title}
                loading="lazy"
                style={{ backgroundColor: 'white' }}
              />
              <ImageListItemBar
                sx={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)',
                }}
                title={image.title}
                position="top"
                actionIcon={
                  <IconButton
                    sx={{ color: 'white' }}
                    aria-label={`star ${image.title}`}
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                }
                actionPosition="left"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </>
  )
}

Top.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}
