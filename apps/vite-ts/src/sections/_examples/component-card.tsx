import { m } from 'framer-motion';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

import { varAlpha } from 'internal-ui/theme/styles';
import { Label } from 'internal-ui/components/label';
import { Image } from 'internal-ui/components/image';
import { varHover, varTranHover } from 'internal-ui/components/animate';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

type Props = {
  item: {
    name: string;
    icon: string;
    href: string;
    category?: string;
  };
};

export function ComponentCard({ item }: Props) {
  return (
    <Paper
      component={RouterLink}
      href={item.href}
      variant="outlined"
      sx={{
        overflow: 'hidden',
        position: 'relative',
        textDecoration: 'none',
        borderColor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.12),
      }}
    >
      {item.category && (
        <Label
          color={item.category === 'MUI X' ? 'info' : 'default'}
          sx={{
            top: 8,
            right: 8,
            zIndex: 9,
            position: 'absolute',
          }}
        >
          {item.category}
        </Label>
      )}

      <CardActionArea
        component={m.div}
        whileHover="hover"
        sx={{
          borderRadius: 0,
          color: 'text.secondary',
          bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.04),
        }}
      >
        <m.div variants={varHover(1.1)} transition={varTranHover()}>
          <Image alt={item.name} src={item.icon} ratio="1/1" sx={{ width: 200, maxWidth: 1 }} />
        </m.div>
      </CardActionArea>

      <Typography variant="subtitle2" sx={{ p: 2, textAlign: 'center' }}>
        {item.name}
      </Typography>
    </Paper>
  );
}
