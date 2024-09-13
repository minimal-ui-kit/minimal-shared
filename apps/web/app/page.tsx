import Image from 'next/image';
import { Button } from '@repo/ui/button';
import styles from './page.module.css';
import { add } from '@repo/math/add';
import { subtract } from '@repo/math/subtract';

export default function Home() {
  return (
    <div className={styles.page}>
      <h2>Add: {add(1, 2)}</h2>
      <h2>Subtract: {subtract(11, 2)}</h2>
    </div>
  );
}
