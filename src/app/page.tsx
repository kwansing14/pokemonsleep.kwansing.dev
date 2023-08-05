import ResearchIdSubmit from "@/app/components/ResearchIDSubmit";
import ListOfIDs from "@/app/components/ListOfIDs";
import Slider from "@/app/components/Toggle";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-14">
      <h1 className="mt-4 border-l-4 py-1 pl-8 text-xl text-slate-200 sm:mt-12 sm:text-4xl">
        Welcome to the Pokemon Sleep Research Community!
      </h1>
      <h2 className="text-md  border-l-4 py-1 pl-8 text-slate-400 sm:mt-0 sm:text-xl">
        Share your Researcher ID / friend code while adding each other easily.
      </h2>
      <ResearchIdSubmit />
      <div className="w-full border-t border-slate-400" />
      <Slider />
      <Suspense fallback={<div className="mt-8">Fetching data...</div>}>
        {/* @ts-expect-error - Async Server Component */}
        <ListOfIDs />
      </Suspense>
    </main>
  );
}
