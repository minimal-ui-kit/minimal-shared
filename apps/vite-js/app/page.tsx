import { Button } from "@minimals/shared/components/button";
import { useDemmo } from "@minimals/shared/hooks";
import { useTest } from "@minimals/shared/hooks/useTest";
import { add } from "@minimals/mock";
import { subtract } from "@minimals/mock/test/subtract";

export default function Home() {
  const test = useTest();
  const demo = useDemmo();

  return (
    <div
      style={{
        gap: "4rem",
        padding: "4rem",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1>Vite.js</h1>

      <h2>add:{add(1, 2)}</h2>

      <h2>subtract:{subtract(11, 2)}</h2>

      <h2 style={{ color: "green" }}>test: {test}</h2>

      <h2 style={{ color: "yellow" }}>demo: {demo}</h2>

      <Button appName="docs">Open alert</Button>
    </div>
  );
}
