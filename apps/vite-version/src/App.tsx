import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Button } from '@minimals/shared/components/button';
import { Card } from '@minimals/shared/components';
import styles from './page.module.css';

import { useTest } from '@minimals/shared/hooks/use-test';
import { useDemmo } from '@minimals/shared/hooks';
import { add } from '@minimals/mock';
import { add as add1 } from '@minimals/mock/test';
import { add as add2 } from '@minimals/mock/test/add';
import { subtract } from '@minimals/mock/test/subtract';

export default function Home() {
  const test = useTest();
  const demo = useDemmo();

  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite.js version</h1>

      {test}
      <br />
      {demo}

      <Card
        title='DEV'
        href='#'
      >
        Card
      </Card>
      <Button appName='DEV'>button</Button>
      <h1>DEV</h1>
      <h2>Add: {add(1, 2)}</h2>
      <h2>Subtract: {subtract(11, 2)}</h2>
    </>
  );
}
