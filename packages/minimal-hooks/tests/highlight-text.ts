import chalk from 'chalk';

// ----------------------------------------------------------------------

export const highlightText = {
  value: (text: string) => `${chalk.yellowBright(text)}`,
  fn: (text: string) => `${chalk.magenta(text)}`,
};
