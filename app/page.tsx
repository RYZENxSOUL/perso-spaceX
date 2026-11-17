import { SpaceScope } from "@/components/explorer/SpaceScope";
import { Suspense } from "react";


export default function Home() {
  return (
    <Suspense fallback={<div style={{ background: '#040912', height: '100vh' }}></div>}>
      <SpaceScope />
    </Suspense>
  );
}
