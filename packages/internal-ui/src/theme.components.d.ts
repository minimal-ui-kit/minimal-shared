import type {} from '@mui/material/Fab';
import type {} from '@mui/material/Chip';
import type {} from '@mui/material/Badge';
import type {} from '@mui/material/Button';
import type {} from '@mui/material/Slider';
import type {} from '@mui/material/Pagination';
import type {} from '@mui/material/ButtonGroup';
import type {} from '@mui/material/AvatarGroup';

declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    soft: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    soft: true;
  }
}

declare module '@mui/material/ButtonGroup' {
  interface ButtonGroupPropsVariantOverrides {
    soft: true;
  }
}

declare module '@mui/material/Fab' {
  interface FabPropsVariantOverrides {
    outlined: true;
    outlinedExtended: true;
    soft: true;
    softExtended: true;
  }
}

declare module '@mui/material/AvatarGroup' {
  interface AvatarGroupPropsVariantOverrides {
    compact: true;
  }
}

declare module '@mui/material/Slider' {
  interface SliderPropsColorOverrides {
    inherit: true;
  }
}

declare module '@mui/material/Pagination' {
  interface PaginationPropsVariantOverrides {
    soft: true;
  }

  interface PaginationPropsColorOverrides {
    info: true;
    success: true;
    warning: true;
    error: true;
  }
}

declare module '@mui/material/Badge' {
  interface BadgePropsVariantOverrides {
    alway: true;
    busy: true;
    online: true;
    offline: true;
    invisible: true;
  }
}
