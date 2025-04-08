export const COLORS = {
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
  reset: '\x1b[0m',
} as const;

type ColorName = Exclude<keyof typeof COLORS, 'reset'>;

const colorize = (color: ColorName, message: string): string => {
  return `${COLORS[color]}${message}${COLORS.reset}`;
};

export const colorLogger: Record<ColorName, (message: string) => string> = {
  magenta: (msg) => colorize('magenta', msg),
  cyan: (msg) => colorize('cyan', msg),
  yellow: (msg) => colorize('yellow', msg),
  green: (msg) => colorize('green', msg),
  red: (msg) => colorize('red', msg),
  blue: (msg) => colorize('blue', msg),
  gray: (msg) => colorize('gray', msg),
};

export const highlightText = {
  val: (msg: string) => colorize('yellow', msg),
  fn: (msg: string) => colorize('magenta', msg),
};
