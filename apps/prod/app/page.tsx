import { Button } from '@minimals/shared/button';
import { Card } from '@minimals/shared/card';
import styles from './page.module.css';
import { add } from '@minimals/mock';
import { subtract } from '@minimals/mock/subtract';

export default function Home() {
  return (
    <div className={styles.page}>
      <Card
        title='PROD'
        href='#'
      >
        Card
      </Card>
      <Button appName='PROD'>button</Button>
      <h1>DEV</h1>
      <h2>Add: {add(1, 2)}</h2>
      <h2>Subtract: {subtract(11, 2)}</h2>
    </div>
  );
}
