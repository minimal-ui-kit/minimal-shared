import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { MaintenanceIllustration } from 'internal-ui/assets/illustrations';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export function MaintenanceView() {
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Typography variant="h3" sx={{ mb: 2 }}>
        Website currently under maintenance
      </Typography>

      <Typography sx={{ color: 'text.secondary' }}>
        We are currently working hard on this page!
      </Typography>

      <MaintenanceIllustration sx={{ my: { xs: 5, sm: 10 } }} />

      <Button component={RouterLink} href="/" size="large" variant="contained">
        Go to home
      </Button>
    </Box>
  );
}
