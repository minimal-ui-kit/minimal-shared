import chalk from 'chalk';

// ----------------------------------------------------------------------

export const highlightText = {
  val: (text: string) => `${chalk.yellowBright(text)}`,
  fn: (text: string) => `${chalk.magenta(text)}`,
};
