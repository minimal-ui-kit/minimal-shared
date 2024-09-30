import React from 'react';
import { Helmet } from 'react-helmet-async';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useScrollOffsetTop } from '@minimals/hooks/use-scroll-offset-top';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const metadata = { title: `Blank - ${CONFIG.appName}` };

const defaultValue = 0;

export default function Page() {
  const { offsetTop } = useScrollOffsetTop(defaultValue);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <Box
        sx={{
          width: defaultValue || 80,
          height: defaultValue || 80,
          bgcolor: 'red',
          position: 'fixed',
          top: 0,
          right: 0,
          zIndex: 9999,
          ...(offsetTop && {
            bgcolor: 'green',
          }),
        }}
      />

      <Container sx={{ color: 'black' }}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Blank
        </Typography>

        <Button
          onClick={() => window.scrollTo(0, defaultValue * 2)}
          sx={{
            position: 'fixed',
            top: '50%',
            left: 0,
          }}
        >
          CLick
        </Button>

        <Box sx={{ bgcolor: 'pink', height: 1000, width: 400, typography: 'h6', p: 3, mb: 5 }}>
          Section 1
        </Box>

        <Box sx={{ bgcolor: 'cyan', height: 1000, typography: 'h6', p: 3 }}>Section 2</Box>
      </Container>
    </>
  );
}
