import * as React from 'react'
import SearchBar from '@/components/parts/SearchBar'
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material'
import DefaultLayout from '@/components/layouts/default'
import { ReactElement } from 'react'

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export default function Top() {
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
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
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
                  image="https://source.unsplash.com/random?wallpapers"
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
