import DefaultLayout from '@/components/layouts/default'
import SearchBar from '@/components/parts/SearchBar'
import { getApiImages } from '@/orval/generated/images/images'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material'
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
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={0.3}>
          {data?.map((image) => (
            <Grid item key={image.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    pt: '56.25%',
                  }}
                  image={image.url}
                />
                <CardContent sx={{ flexGrow: 1, py: 2 }}>
                  <Typography variant="h5" component="h2">
                    Image
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

Top.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}
