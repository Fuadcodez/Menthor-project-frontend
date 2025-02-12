"use client"

import Countries from "./countries/page";

export default function Home() {
  return (
    <>
    <div className="dark:bg-[hsl(207,26%,17%)] bg-[hsl(0,0%,90%)] relative min-h-[100svh] overflow-hidden">
    <Countries/>
    </div>
    </>
  );
}
