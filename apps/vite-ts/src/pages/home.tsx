import type { ChipProps } from '@mui/material/Chip';
import type { PaperProps } from '@mui/material/Paper';
import type { ButtonProps } from '@mui/material/Button';

import { Helmet } from 'react-helmet-async';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

const metadata = {
  title: 'Minimals UI: The starting point for your next project',
  description:
    'The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style',
};

const BUTTONS: ButtonProps[] = [
  { variant: 'soft', color: 'primary' },
  { variant: 'contained', color: 'secondary' },
  { variant: 'outlined', color: 'warning' },
  { variant: 'text', color: 'error' },
];

const CHIPS: ChipProps[] = [
  { variant: 'soft', color: 'primary' },
  { variant: 'filled', color: 'secondary' },
  { variant: 'outlined', color: 'warning' },
];

const paperProps: PaperProps = {
  variant: 'outlined',
  sx: {
    p: 3,
    mb: 5,
    gap: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
};

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Helmet>

      <Container sx={{ py: 10 }}>
        <Paper {...paperProps}>
          <Typography variant="h6">Buttons</Typography>
          <Box gap={3} display="flex">
            {BUTTONS.map((item) => (
              <Button key={item.variant} {...item}>
                {item.variant}
              </Button>
            ))}
          </Box>
        </Paper>

        <Paper {...paperProps}>
          <Typography variant="h6">Chip</Typography>
          <Box gap={3} display="flex">
            {CHIPS.map((item) => (
              <Chip
                key={item.variant}
                variant={item.variant}
                color={item.color}
                label={item.variant}
              />
            ))}
          </Box>
        </Paper>

        <Button variant="soft">Button</Button>
      </Container>
    </>
  );
}
